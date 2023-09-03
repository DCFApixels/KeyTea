

class Delegate
{
    context;
    handler;
    constructor(context, handler)
    {
        this.context = context;
        this.handler = handler;
    }
    invoke()
    {
        this.handler.apply(this.context, arguments);
    }
    isEquals(context, handler)
    {
        return this.context === context && this.handler === handler;
    }
}
Function.prototype.toDelegate = function(context){
    return new Delegate(context, this);
}


const RxMatrix = {
    __map: new Map(),

    add: function(x, y){
        this.__map
    },
    has: function(x, y){
        
    },
    del: function(x, y){
        
    },
}

class PropertyChannel
{

    constructor(){
        RxMatrix
    }

    onModel()
    {

    }
    offModel()
    {

    }
    onView()
    {

    }
    offView()
    {

    }
}

//if(HTMLElement.prototype.SetValueFromModel === null || 
//    HTMLElement.prototype.SetValueFromModel === undefined)
//{
//    HTMLElement.prototype.SetValueFromModel = function(value, isAnimated) {
//        this.value = value;
//    }
//}
//
//class Delegate
//{
//    context;
//    handler;
//    constructor(context, handler)
//    {
//        this.context = context;
//        this.handler = handler;
//    }
//    invoke()
//    {
//        this.handler.apply(this.context, arguments);
//    }
//    isEquals(context, handler)
//    {
//        return this.context === context && this.handler === handler;
//    }
//}
//Function.prototype.toDelegate = function(context){
//    return new Delegate(context, this);
//}
//
//class PropertyChannel
//{
//    #viewHandlers = [];
//    #modelHandlers = [];
//
//    #value = null;
//    #isDestroyed = false;
//
//    get value() { return this.#value; }
//    get isDestroyed() { return this.#isDestroyed; }
//
//    constructor(value)
//    {
//        this.#value = value;
//    }
//
//
//    SubscribeView(context, handler, isAnimated)
//    {
//        let delegate = handler.toDelegate(context);
//        this.#viewHandlers.push(delegate);
//        if(isAnimated !== true)
//            isAnimated = false; 
//        delegate.invoke(this.#value, isAnimated);
//        return this;
//    }
//    SubscribeModel(context, handler, isAnimated)
//    {
//        let delegate = handler.toDelegate(context);
//        this.#modelHandlers.push(delegate);
//        if(isAnimated !== true)
//            isAnimated = false; 
//        delegate.invoke(this.#value, isAnimated);
//        return this;
//    }
//
//    UnsubscribeView(context, handler)
//    {
//        this.#viewHandlers = this.#viewHandlers.filter(o => !o.isEquals(context, handler));
//        return this;
//    }
//    UnsubscribeModel(context, handler)
//    {
//        this.#modelHandlers = this.#modelHandlers.filter(o => !o.isEquals(context, handler));
//        return this;
//    }
//
//    Destroy()
//    {
//        this.#viewHandlers = [];
//        this.#modelHandlers = [];
//        this.#value = undefined;
//        isDestroyed = true;
//    }
//
//
//    SetValueFromView(value, isAnimated)
//    {
//        if(value === this.#value) return;
//
//        this.#modelHandlers.forEach(handler => {
//            handler.invoke(value, isAnimated);
//        });
//        this.#value = value;
//    }
//    SetValueFromModel(value, isAnimated)
//    {
//        if(value === this.#value) return;
//        this.#viewHandlers.forEach(handler => {
//            handler.invoke(value, isAnimated);
//        });
//        this.#value = value;
//    }
//
//
//    BindWith(propertyChannel){
//        this.SubscribeModel(propertyChannel.SetValueFromModel);
//        this.SubscribeView(propertyChannel.SetValueFromView);
//        propertyChannel.SubscribeModel(this.SetValueFromModel);
//        propertyChannel.SubscribeView(this.SetValueFromView);
//        return this;
//    }
//    UnbindWith(propertyChannel){
//        this.UnsubscribeModel(propertyChannel.SetValueFromModel);
//        this.UnsubscribeView(propertyChannel.SetValueFromView);
//        propertyChannel.UnsubscribeModel(this.SetValueFromModel);
//        propertyChannel.UnsubscribeView(this.SetValueFromView);
//        return this;
//    }
//
//
//    SubscribeToPressed(elem){
//        elem.addEventListener("mousedown", this.#OnButtonMouseDown);
//        elem.addEventListener("mouseup", this.#OnButtonMouseUp);
//        return this;
//    }
//    UnsubscribeToPressed(elem){
//        elem.removeEventListener("mousedown", this.#OnButtonMouseDown);
//        elem.removeEventListener("mouseup", this.#OnButtonMouseUp);
//        return this;
//    }
//    #OnButtonMouseDown(e){
//        if(e.target.isValueChangedByProperty === true)
//            return;
//        this.SetValueFromView(true);
//    }
//    #OnButtonMouseUp(e){
//        if(e.target.isValueChangedByProperty === true)
//            return;
//        this.SetValueFromView(false);
//    }
//
//    SubscribeToChange(elem){
//        elem.addEventListener("change", this.#OnChange);
//        return this;
//    }
//    UnsubscribeToChange(elem){
//        elem.removeEventListener("change", this.#OnChange);
//        return this;
//    }
//    #OnChange(e){
//        if(e.target.isValueChangedByProperty === true)
//            return;
//        this.SetValueFromView(e.target.value);
//    }
//
//    SubscribeToInput(elem){
//        elem.addEventListener("input", this.#OnInput);
//        return this;
//    }
//    UnsubscribeToInput(elem){
//        elem.removeEventListener("input", this.#OnInput);
//        return this;
//    }
//    #OnInput(e){
//        if(e.target.isValueChangedByProperty === true)
//            return;
//        this.SetValueFromView(e.target.value);
//    }
//}

