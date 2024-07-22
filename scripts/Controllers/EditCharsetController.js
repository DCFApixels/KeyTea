
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

        this.SetIsCanSave(false);
    }


    OnPropertyChanged(propertyKey, value)
    {
        this.modelClone[propertyKey] = value;
        console.log(this.modelClone);
        this.#ApplyChanges();
    }
    #ApplyChanges()
    {
        let isCanSave = 
            this.modelClone.name != null && 
            this.modelClone.name.length > 0 &&
            this.modelClone.length >= this.modelClone.usedCharsets.length;
        this.SetIsCanSave(isCanSave);
    }

    SaveChanges()
    {
        Object.assign(this.model, this.modelClone);
        this.#ReturnToSelectPasswordScreen();
    }
    #ShowRequireMessage()
    {
        if(this.requireMessages.length > 0)
        {
            this.view.ShowErrorMessage(this.requireMessages[0]);
        }
    }
    CancelChanges()
    {
        this.#ReturnToSelectPasswordScreen();
    }
    #ReturnToSelectPasswordScreen()
    {
        let c = this.screensController.GetScreen(SelectRawPasswordController);
        c.SaveUserData();
        c.Open();
        this.Close();
    }
    

    Open(model) 
    {
        this.SetModel(model);
        this.view.Open(); 

        this.view.name = model.name;
        this.view.user = model.user;
        this.view.length = model.length;
        this.view.version = model.version;

        this.#ApplyChanges();
    }
    Close() { this.view.Close(); }


    SetModel(model)
    {
        this.model = model;
        this.modelClone = Object.assign({}, model);
    }


    SetIsCanSave(bool)
    {
        this.view.SetIsCanSave(bool)
    }
}