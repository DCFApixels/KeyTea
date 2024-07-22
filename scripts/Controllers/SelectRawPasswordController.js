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
        this.OnRawPasswordElementSelected(-1);
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

        for (let i = 0; i < rawPasswordRecordKeys.length; i++)
        {
            const rawPasswordController = this.rawPasswordControllers[i];
            rawPasswordController.SetModel(rawPasswordRecords[rawPasswordRecordKeys[i]]);
        }
        for (let i = rawPasswordRecordKeys.length; i < this.rawPasswordControllers.length; i++)
        {
            const rawPasswordController = this.rawPasswordControllers[i];
            rawPasswordController.SetModel(null);
        }

        if(this.currentRawPasswordNumber >= rawPasswordRecordKeys.length)
        {
            this.OnRawPasswordElementSelected(-1);
        }
    }

    currentRawPassword;
    currentRawPasswordNumber;
    OnRawPasswordElementSelected(number)
    {
        if(number >= this.model.data.rawPasswordRecords.length)
        {
            number = -1;
        }
        this.currentRawPasswordNumber = number;

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

        if(number < 0)
        {
            this.currentRawPassword = null;
            this.view.SetOutputPassword("");
            return;
        }

//TODO добавить сигнал о том что пароль был изменен, а то ни черта не понятно

        let pw = GeneratePasswordWithDefaultHash(
            this.currentRawPassword, 
            this.model.data.charsetRecords, 
            this.model.masterPasswordHash);

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
    OnDeleteRawPasswordButtonClick(number)
    {
        this.model.data.rawPasswordRecords.splice(number, 1);
        if(this.currentRawPasswordNumber == number)
        {
            this.OnRawPasswordElementSelected(-1);
        }
        else if(this.currentRawPasswordNumber > number)
        {
            this.OnRawPasswordElementSelected(this.currentRawPasswordNumber -1);
        }
        this.SaveUserData();
        this.#ApplyRawPasswordControllers();
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
        this.SaveUserData();
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