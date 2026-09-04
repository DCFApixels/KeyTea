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

        this.#ApplyCharsetControllers();
    }


    OnPropertyChanged(propertyKey, value)
    {
        this.modelClone[propertyKey] = value;
    }


    SaveChanges()
    {
        if(this.#CheckSaveRequirements())
        {
            this.modelClone.usedCharsets = Object.keys(this.currentCharsetGroup);
            Object.assign(this.model, RawPasswordRecords.Create(this.modelClone));
            this.#ReturnToSelectPasswordScreen();
        }
    }

    requireMessages = [];
    #CheckSaveRequirements()
    {
        this.requireMessages.length = 0;
        const selectedCharsetCount = Object.keys(this.currentCharsetGroup).length;

        if(typeof this.modelClone.name !== "string" || this.modelClone.name.trim().length <= 0)
        {
            this.requireMessages.push("The Name field is empty.");
        }
        if(selectedCharsetCount <= 0)
        {
            this.requireMessages.push("Select at least one character set.");
        }
        if(Number.isSafeInteger(this.modelClone.length) === false || this.modelClone.length <= 0)
        {
            this.requireMessages.push("Password length must be a positive integer.");
        }
        else if(this.modelClone.length < selectedCharsetCount)
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
        this.view.ShowErrorMessage(null);
        this.#ApplyCharsetControllers();
        this.OnCharsetElementSelected();
        this.view.Open();
    }
    Open(db, model) 
    {
        this.SetDB(db);
        this.SetModel(model);

        this.view.name = model.name;
        this.view.user = model.userName;
        this.view.length = model.length;
        this.view.version = model.version;

        this.view.ShowErrorMessage(null);
        this.#ApplyCharsetControllers();
        this.OnCharsetElementSelected();
        this.view.Open();
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
        this.currentCharsetGroup = {};

        if(this.model != null && this.db != null)
        {
            const charsetRecords = this.db.data.charsetRecords;
            const charsetRecordKeys = this.model.usedCharsets;
            for (let i = 0; i < charsetRecordKeys.length; i++)
            {
                const charsetMyuid = charsetRecordKeys[i];
                if(Object.prototype.hasOwnProperty.call(charsetRecords, charsetMyuid))
                {
                    this.currentCharsetGroup[charsetMyuid] = charsetRecords[charsetMyuid];
                }
            }
            this.OnCharsetElementSelected();
        }
    }



    #ApplyCharsetControllers()
    {
        if(this.db == null)
        {
            return;
        }
        let charsetRecords = this.db.data.charsetRecords;
        let charsetRecordKeys = Object.keys(charsetRecords);
        let newElementsFragment = document.createDocumentFragment();

        for (let i = this.charsetControllers.length; i < charsetRecordKeys.length; i++)
        {
            let v = this.view.CreateCharsetElementView(newElementsFragment);
            let c = new CharsetElementController(charsetRecords[charsetRecordKeys[i]], v, this, i);
            this.charsetControllers.push(c);
        }
        this.view.charsetsList.appendChild(newElementsFragment);

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
            if(Object.prototype.hasOwnProperty.call(this.currentCharsetGroup, myuid))
            {
                delete this.currentCharsetGroup[myuid];
            }
            else if(Object.prototype.hasOwnProperty.call(this.db.data.charsetRecords, myuid))
            {
                this.currentCharsetGroup[myuid] = this.db.data.charsetRecords[myuid];
            }
        }

        for (let i = 0; i < this.charsetControllers.length; i++) 
        {
            const charsetController = this.charsetControllers[i];
            if(charsetController.model != null
                && Object.prototype.hasOwnProperty.call(this.currentCharsetGroup, charsetController.model.myuid))
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
        let newRecord = CharsetRecords.Create();
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
        UserDataStorage.Save(this.db.data);
    }
}
