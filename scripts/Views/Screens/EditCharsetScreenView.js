
class EditCharsetScreenView extends ViewBase
{
    get name() { return this.nameField.value; }
    set name(value) { this.nameField.value = value; }
    get chars() { return this.charsField.value; }
    set chars(value) 
    {
        if(value == null)
            {
            this.charsField.value = "";
            return;
        }
        this.charsField.value = value;
    }
    get priority() { return parseInt(this.priorityField.value); }
    set priority(value) { this.priorityField.value = "" + value; }


    constructor()
    {
        super();
        this.root = document.querySelector("#edit_charset_screen .form");

        this.nameField = this.root.querySelector("#charset_name_field");
        this.charsField = this.root.querySelector("#charset_chars_field");
        this.priorityField = this.root.querySelector("#charset_priority_field");

        this.saveButton = this.root.querySelector("#charset_save_button");
        this.cancelButton = this.root.querySelector("#charset_cancel_button");
        this.errorLabel = this.root.querySelector("#charset_error_label");

        this.nameField.addEventListener('input', this.#OnNameFieldChanged.bind(this));
        this.charsField.addEventListener('input', this.#OnCharsFieldChanged.bind(this));
        this.priorityField.addEventListener('input', this.#OnPriorityFieldChanged.bind(this));

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


    #OnNameFieldChanged(event)
    {
        event.target.value = this.#OnPropertyChanged("name", event.target.value);
    }
    #OnCharsFieldChanged(event)
    {
        event.target.value = this.#OnPropertyChanged("chars", event.target.value);
    }
    #OnPriorityFieldChanged(event)
    {
        let v = Utility.parseInt(event.target.value);
        this.lengthField.value = v;
        event.target.value = this.#OnPropertyChanged("priority", v);
    }
    #OnPropertyChanged(key, value)
    {
        return this.controller.OnPropertyChanged(key, value);
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
}