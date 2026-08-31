class MasterPasswordController
{
    model;
    view;
    screensController;
    
    constructor(model, view, screensController)
    {
        this.model = model;
        this.view = view;
        this.screensController = screensController;
        this.view.SubscribeController(this);
    }

    Login(masterPassword)
    {
        this.model.EnterMasterPassword(masterPassword);
        let c = screensController.GetScreen(SelectRawPasswordController);
        c.Open();
        this.Close();
    }

    ClearUserData()
    {
        if(UserDataStorage.Clear() == false)
        {
            return false;
        }

        this.model.ClearMasterPassword();
        this.model.data = UserData.CreateDefault();
        return true;
    }

    Open() { this.view.Open(); }
    Close() { this.view.Close(); }
}
