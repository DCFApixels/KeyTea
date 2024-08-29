class EditPasswordController
{
    db;
    model;
    view;
    screensController;
    
    modelClone;

    charsetControllers = [];


    constructor(model, view, screensController)
    {
        this.SetModel(model);

        this.view = view;
        this.screensController = screensController;
        this.view.SubscribeController(this);

        //this.SetIsCanSave(false);

        this.#ApplyCharsetControllers();
    }


    OnPropertyChanged(propertyKey, value)
    {
        this.modelClone[propertyKey] = value;
        //console.log(this.modelClone);
        //this.#ApplyChanges();
    }
    //#ApplyChanges()
    //{
    //    let isCanSave = 
    //        this.modelClone.name != null && 
    //        this.modelClone.name.length > 0 &&
    //        this.modelClone.length >= this.modelClone.usedCharsets.length;
    //    this.SetIsCanSave(isCanSave);
    //}

    SaveChanges()
    {
        if(this.#CheckSaveRequires()) 
        {
            this.modelClone.usedCharsets = Object.keys(this.currentCharsetGroup);
            Object.assign(this.model, this.modelClone);
            this.#ReturnToSelectPasswordScreen();
        }
    }

    requireMessages = [];
    #CheckSaveRequires()
    {
        this.requireMessages.length = 0;
        if(this.modelClone.name == null || this.modelClone.name.length <= 0)
        {
            this.requireMessages.push("The Name field is empty.");
        }
        if(this.modelClone.length < Object.keys(this.currentCharsetGroup).length)
        {
            this.requireMessages.push("Password length is less than the number of selected character sets.");
        }
        if(this.requireMessages.length > 0)
        {
            this.view.ShowErrorMessage(this.requireMessages[0]);
        }
        return this.requireMessages.length <= 0;
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
    
    OpenRestore()
    {
        this.view.Open(); 
        this.view.ShowErrorMessage(null);
        this.#ApplyCharsetControllers();
        this.OnCharsetElementSelected();
    }
    Open(db, model) 
    {
        this.SetDB(db);
        this.SetModel(model);
        this.view.Open(); 

        this.view.name = model.name;
        this.view.user = model.user;
        this.view.length = model.length;
        this.view.version = model.version;

        //this.#ApplyChanges();

        this.view.ShowErrorMessage(null);
        this.#ApplyCharsetControllers();
        this.OnCharsetElementSelected();
    }
    Close() { this.view.Close(); }

    SetDB(db)
    {
        this.db = db;
    }
    SetModel(model)
    {
        this.model = model;
        this.modelClone = Object.assign({}, model);

        if(this.model != null)
        {
            let charsetRecords = this.db.data.charsetRecords;
            let charsetRecordKeys = this.model.usedCharsets;
            for (let i = 0; i < charsetRecordKeys.length; i++)
            {
                const charsetMyuid = charsetRecordKeys[i];
                this.currentCharsetGroup[charsetMyuid] = charsetRecords[charsetMyuid];
                //this.OnCharsetElementSelected(charsetMyuid);
            }
            this.OnCharsetElementSelected();
        }
    }


    //SetIsCanSave(bool)
    //{
    //    //this.view.SetIsCanSave(bool)
    //}




    #ApplyCharsetControllers()
    {
        if(this.db == null)
        {
            return;
        }
        let charsetRecords = this.db.data.charsetRecords;
        let charsetRecordKeys = Object.keys(charsetRecords);

        for (let i = this.charsetControllers.length; i < charsetRecordKeys.length; i++)
        {
            let v = CharsetElementView.Create(this.view.charsetsList);
            let c = new CharsetElementController(charsetRecords[charsetRecordKeys[i]], v, this, i);
            this.charsetControllers.push(c);
        }

        for (let i = 0; i < charsetRecordKeys.length; i++)
        {
            const charsetController = this.charsetControllers[i];
            charsetController.SetModel(charsetRecords[charsetRecordKeys[i]]);
        }
        for (let i = charsetRecordKeys.length; i < this.charsetControllers.length; i++)
        {
            const charsetController = this.charsetControllers[i];
            charsetController.SetModel(null);
        }
    }

    currentCharsetGroup = {};
    OnCharsetElementSelected(myuid)
    {
        if(myuid != null)
        {
            if(this.currentCharsetGroup.hasOwnProperty(myuid))
            {
                delete this.currentCharsetGroup[myuid];
            }
            else
            {
                this.currentCharsetGroup[myuid] = this.db.data.charsetRecords[myuid];
            }

            console.log(this.currentCharsetGroup);
        }

        for (let i = 0; i < this.charsetControllers.length; i++) 
        {
            const charsetController = this.charsetControllers[i];
            if(charsetController.model != null && this.currentCharsetGroup.hasOwnProperty(charsetController.model.myuid))
            {
                charsetController.Select(false);
            }
            else
            {
                charsetController.Deselect();
            }
        }

        
    }

    OnAddCharsetButtonClick()
    {
        let charsetRecords = this.db.data.charsetRecords;
        let newRecord = new CharsetRecord();
        charsetRecords[newRecord.myuid] = newRecord;
        this.#ApplyCharsetControllers();
    }
    OnEditCharsetButtonClick(myuid)
    {
        let charset = this.db.data.charsetRecords[myuid];

        let editPasswordController = this.screensController.GetScreen(EditCharsetController);
        editPasswordController.Open(charset);
        this.Close();
    }
    OnDeleteCharsetButtonClick(myuid)
    {
        delete this.db.data.charsetRecords[myuid];
        this.SaveUserData();
        this.#ApplyCharsetControllers();
        this.OnCharsetElementSelected();
    }

    SaveUserData()
    {
        UserData.Save(this.db.data);
    }
}