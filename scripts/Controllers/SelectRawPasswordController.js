class SelectRawPasswordController
{
    model;
    view;
    screensController;

    rawPasswordControllers = [];

    constructor(model, view, screensController)
    {
        this.model = model;
        this.view = view;
        this.screensController = screensController;
        this.view.SubscribeController(this);

        this.#ApplyRawPasswordControllers();
        this.OnRawPasswordElementSelected(0);
        //=//специальная ошибка-напоминался
    }

    #ApplyRawPasswordControllers()
    {
        let rawPasswordRecords = this.model.data.rawPasswordRecords;
        let rawPasswordRecordKeys = Object.keys(rawPasswordRecords);

        for (let i = this.rawPasswordControllers.length; i < rawPasswordRecordKeys.length; i++)
        {
            let v = RawPasswordElementView.Create(this.view.rawPasswordsList);
            let c = new RawPasswordElementController(rawPasswordRecords[rawPasswordRecordKeys[i]], v, this, i);
            this.rawPasswordControllers.push(c);
        }

        for (let i = 0; i < this.rawPasswordControllers.length; i++)
        {
            const rawPasswordController = this.rawPasswordControllers[i];
            rawPasswordController.SetModel(rawPasswordRecords[rawPasswordRecordKeys[i]]);
        }
    }

    currentRawPassword;
    OnRawPasswordElementSelected(number)
    {
        for (let i = 0; i < this.rawPasswordControllers.length; i++) 
        {
            const rawPasswordController = this.rawPasswordControllers[i];
            if(i == number)
            {
                rawPasswordController.Select();
                this.currentRawPassword = rawPasswordController.model;
            }
            else
            {
                rawPasswordController.Deselect();
            }
        }

//TODO добавить сигнал о том что пароль был изменен, а то ни черта не понятно

        //console.log(this.currentRawPassword);
        //console.log(this.model.data.charsetRecords);
        //console.log(this.model.data.charsetRecords.Numbers.chars);
        //console.log(this.model.masterPasswordHash);

        let pw = GeneratePasswordWithDefaultHash(
            this.currentRawPassword, 
            this.model.data.charsetRecords, 
            this.model.masterPasswordHash);

        //console.log(pw);

        this.view.SetOutputPassword(pw);
    }

    OnAddRawPasswordButtonClick()
    {
        let rawPasswordRecords = this.model.data.rawPasswordRecords;
        rawPasswordRecords.push(new RawPasswordRecord());
        this.#ApplyRawPasswordControllers();
    }

    OnEditRawPasswordButtonClick(number)
    {
        let rawPasswordController = this.rawPasswordControllers[number];
        let rawPassword = rawPasswordController.model;

        let editPasswordController = this.screensController.GetScreen(EditPasswordController);
        editPasswordController.Open(rawPassword);
        this.Close();
    }

    OnExportButtonClick()
    {
        ImportExportDialogUtility.OpenExportJsonDialog(UserData.ToJson(this.model.data));
    }
    OnImportButtonClick()
    {
        ImportExportDialogUtility.OpenImportDialog(this.#OnImportDataComplete.bind(this));
    }

    #OnImportDataComplete(contents)
    {
        this.model.data = UserData.FromJson(contents);
        UserData.Save(this.model.data);
        this.#ApplyRawPasswordControllers();
    }

    SaveUserData()
    {
        UserData.Save(this.model.data);
    }

    Open() 
    {
        this.view.Open();
        this.#ApplyRawPasswordControllers();
    }
    Close() { this.view.Close(); }
}