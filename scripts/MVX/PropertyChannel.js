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
        this.#handlers.forEach(handler => {
            handler(value, isAnimated);
        });
        this.#value = value;
    }
}