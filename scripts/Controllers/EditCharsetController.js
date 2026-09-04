
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
    }


    OnPropertyChanged(propertyKey, value)
    {
        this.modelClone[propertyKey] = value;
        return this.modelClone[propertyKey];
    }

    #CheckSaveRequirements()
    {
        this.requireMessages.length = 0;

        if(typeof this.modelClone.name !== "string" || this.modelClone.name.trim().length <= 0)
        {
            this.requireMessages.push("The Name field is empty.");
        }
        if(typeof this.modelClone.chars !== "string" || this.modelClone.chars.length <= 0)
        {
            this.requireMessages.push("The Charset field is empty.");
        }
        if(Number.isSafeInteger(this.modelClone.priority) === false || this.modelClone.priority < 0)
        {
            this.requireMessages.push("Priority must be a non-negative integer.");
        }

        if(this.requireMessages.length > 0)
        {
            this.view.ShowErrorMessage(this.requireMessages[0]);
        }
        return this.requireMessages.length <= 0;
    }

    SaveChanges()
    {
        if(this.#CheckSaveRequirements() === false)
        {
            return;
        }

        Object.assign(this.model, CharsetRecords.Create(this.modelClone));
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

        this.view.name = model.name;
        this.view.chars = model.chars;
        this.view.priority = model.priority;

        this.view.ShowErrorMessage(null);
        this.view.Open();
    }
    Close() { this.view.Close(); }


    SetModel(model)
    {
        this.model = model;
        this.modelClone = Object.assign({}, model);
    }
}
