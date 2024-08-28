class EditPasswordScreenView extends ViewBase
{
    root;

    nameField;
    userField;
    lengthField;
    versionField;
    upVersionButton;

    charsetsList;

    get name() { return this.nameField.value; }
    set name(value) { this.nameField.value = value; }
    get user() { return this.userField.value; }
    set user(value) 
    {
        if(value == null)
            {
            this.userField.value = "";
            return;
        }
        this.userField.value = value;
    }
    get length() { return parseInt(this.lengthField.value); }
    set length(value) { this.lengthField.value = "" + value; }
    get version() { return parseInt(this.versionField.value); }
    set version(value) { this.versionField.value = "" + value; }

    constructor()
    {
        super();
        this.root = document.querySelector("#edit_password_screen .form");

        this.nameField = this.root.querySelector("#raw_password_name_field");
        this.userField = this.root.querySelector("#raw_password_user_field");
        this.lengthField = this.root.querySelector("#raw_password_length_field");
        this.versionField = this.root.querySelector("#raw_password_version_field");
        this.upVersionButton = this.root.querySelector("#raw_password_up_version_button");

        this.charsetsList = this.root.querySelector("#charsets_list");

        this.saveButton = this.root.querySelector("#raw_password_save_button");
        this.cancelButton = this.root.querySelector("#raw_password_cancel_button");
        this.errorLabel = this.root.querySelector("#raw_password_error_label");

        this.nameField.addEventListener('input', this.#OnNameFieldChanged.bind(this));
        this.userField.addEventListener('input', this.#OnUserFieldChanged.bind(this));
        this.lengthField.addEventListener('input', this.#OnLengthFieldChanged.bind(this));
        this.versionField.addEventListener('input', this.#OnVersionFieldChanged.bind(this));

        this.upVersionButton.addEventListener('click', this.#OnUpVersionButtonClick.bind(this));
        
        this.saveButton.addEventListener('click', this.#OnSaveButtonClick.bind(this));
        this.cancelButton.addEventListener('click', this.#OnCancelButtonClick.bind(this));
    }

    ShowErrorMessage(message)
    {
        if(message == null || message == "")
        {
            message = "";
        }
        this.errorLabel.innerHTML = "" + message;
        if(this.errorLabel.classList.contains("hidden") == false)
        {
            this.errorLabel.classList.add("hidden");
        }
        if(message != "")
        {
            setTimeout((x) => {
                x.classList.remove("hidden");
            }, 1, this.errorLabel);
        }
    }

    SetOutputPassword(password)
    {
        console.log(password);
        this.outputPassword.value = password;
    }

    #OnUpVersionButtonClick()
    {
        let v = parseInt(this.versionField.value);
        v++;
        this.versionField.value = "" + v;

        this.controller.OnPropertyChanged("version", v);
    }

    #OnNameFieldChanged(event)
    {
        this.#OnPropertyChanged("name", event.target.value);
    }
    #OnUserFieldChanged(event)
    {
        this.#OnPropertyChanged("userName", event.target.value);
    }
    #OnLengthFieldChanged(event)
    {
        let v = Utility.parseInt(event.target.value);
        this.lengthField.value = v;
        this.#OnPropertyChanged("length", v);
    }
    #OnVersionFieldChanged(event)
    {
        let v = Utility.parseInt(event.target.value);
        this.versionField.value = v;
        this.#OnPropertyChanged("version", v);
    }
    #OnPropertyChanged(key, value)
    {
        this.controller.OnPropertyChanged(key, value);
    }

    #OnSaveButtonClick()
    {
        this.controller.SaveChanges();
    }
    #OnCancelButtonClick()
    {
        this.controller.CancelChanges();
    }

    Open()
    {
        this.root.classList.remove('disabled');
        this.root.classList.remove('hidden');
    }
    Close()
    {
        //this.root.classList.add('disabled');
        this.root.classList.add('hidden');
    }

    SetIsCanSave(bool)
    {
        this.saveButton.disabled = !bool;
    }
}