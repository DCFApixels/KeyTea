class PropertyChannel
{
    #handlers = []
    #value = null

    get value() 
    {
        return this.#value;
    }

    constructor(value, handlers)
    {
        this.#value = value;

        if(handlers !== undefined)
        {
            if(handlers.constructor === Function)
            {
                this.AddListener(handlers, false);
            }
            else
            {
                if(handlers.constructor === Array)
                {
                    handlers.forEach(handler => { 
                        this.AddListener(handler, false); 
                    });
                }
            }
        }
    }

    AddListener(listener, isAnimated)
    {
        this.#handlers.push(listener);
        if(isAnimated === null || isAnimated !== true)
            isAnimated = false; 
        listener(this.#value, isAnimated);
    }
    RemoveListener(listener)
    {
        this.#handlers = this.#handlers.filter(o => o !== listener);
    }
    RemoveAllListener()
    {
        handlers = [];
    }

    SetValue(value, isAnimated)
    {
        if(value == this.#value)
            return;

        this.#handlers.forEach(handler => {
            handler(value, isAnimated);
        });
        this.#value = value;
    }

    //сейчас SetValue может вызывать рекурсивно функцию, чтобы избежать этого добавлю вызов приватной функции с аргументом глубыны котоырй повышается на 1 при каждом входе, если глубина большу 1 то функция не выыполняется и сразу выходит

    Bind(propertyChannel){
        this.AddListener(propertyChannel.SetValue);
        propertyChannel.AddListener(this.SetValue);
    }
    Unbind(propertyChannel){
        this.RemoveListener(propertyChannel.SetValue);
        propertyChannel.RemoveListener(this.SetValue);
    }

    BindWithButton(elem){
        let self = this;
        elem.onmousedown = function() {
            self.SetValue(true, true)
        };
        elem.onmouseup = function() {
            self.SetValue(false, true);
        };
    }
    BindWithCheckbox(elem){
        let self = this;
        elem.onchange = function() {
            self.SetValue(this.value);
        }
    }
    BindWithInput(elem){
        let self = this;
        elem.oninput = function() {
            self.SetValue(this.value);
        }
    }
}