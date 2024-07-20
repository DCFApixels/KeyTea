class ViewBase
{
    constructor() { } 
    //по идее так не правильно делать, но js с динамической типизацией, потому это будет нормально работать, 
    //так как работа будет настроена как с событиями, а передача экземпляра это аналог подписки
    controller;
    SubscribeController(controller)
    {
        this.controller = controller;
    }
}