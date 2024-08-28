
class EditCharsetController
{
    model;
    view;
    screensController;
    
    modelClone;

    requireMessages = [];

    constructor(model, view, screensController)
    {
        this.SetModel(model);

        this.view = view;
        this.screensController = screensController;
        this.view.SubscribeController(this);

        //this.SetIsCanSave(false);
    }


    OnPropertyChanged(propertyKey, value)
    {
        this.modelClone[propertyKey] = value;
        //this.#ApplyChanges();
        return this.modelClone[propertyKey];
    }
    //#ApplyChanges()
    //{
    //    let isCanSave = 
    //        this.modelClone.name != null && 
    //        this.modelClone.name.length > 0 &&
    //        this.modelClone.length >= this.modelClone.usedCharsets.length;
    //    this.SetIsCanSave(isCanSave);
    //}


    #ShowRequireMessage()
    {
        if(this.requireMessages.length > 0)
        {
            this.view.ShowErrorMessage(this.requireMessages[0]);
        }
    }
    SaveChanges()
    {
        Object.assign(this.model, this.modelClone);
        this.#ReturnToEditRawPasswordScreen();
    }
    CancelChanges()
    {
        this.#ReturnToEditRawPasswordScreen();
    }
    #ReturnToEditRawPasswordScreen()
    {
        let c = this.screensController.GetScreen(EditPasswordController);
        c.SaveUserData();
        c.OpenRestore();
        this.Close();
    }
    

    Open(model) 
    {
        this.SetModel(model);
        this.view.Open(); 

        this.view.name = model.name;
        this.view.chars = model.chars;
        this.view.priority = model.priority;

        //this.#ApplyChanges();
    }
    Close() { this.view.Close(); }


    SetModel(model)
    {
        this.model = model;
        this.modelClone = Object.assign({}, model);
    }


    //SetIsCanSave(bool)
    //{
    //    this.view.SetIsCanSave(bool)
    //}
}