async function CopyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        console.log('Пароль скопирован в буфер обмена');
    } catch (err) {
        console.error('Не удалось скопировать пароль в буфер обмена: ', err);
    }
}

class SelectScreenView extends ViewBase
{
    root;
    rawPasswordsList;
    outputPassword;
    outputPasswordCopyButton;
    dataExportButton;
    dataImportButton;

    constructor()
    {
        super();
        this.root = document.querySelector("#select_screen .form");

        this.rawPasswordsList = this.root.querySelector("#passwords_list");
        this.rawPasswordsList = this.root.querySelector("#passwords_list");

        this.outputPassword = this.root.querySelector("#output_password");
        this.outputPasswordCopyButton = this.root.querySelector("#output_password_copy_button");

        this.addRawPasswordButton = this.root.querySelector("#add_raw_password_button");
        this.dataExportButton = this.root.querySelector("#user_data_export_button");
        this.dataImportButton = this.root.querySelector("#user_data_import_button");
        this.returnToMasterPasswordButton = this.root.querySelector("#return_to_master_password");

        this.addRawPasswordButton.addEventListener('click', this.#OnAddRawPasswordButtonClick.bind(this));
        this.outputPasswordCopyButton.addEventListener('click', this.#OnOutputPasswordCopyButtonClick.bind(this));
        this.dataExportButton.addEventListener('click', this.#OnExportButtonClick.bind(this));
        this.dataImportButton.addEventListener('click', this.#OnInputButtonClick.bind(this));
        this.returnToMasterPasswordButton.addEventListener('click', this.#OnReturnToMasterPasswordButtonClick.bind(this));
    }


    SetOutputPassword(password)
    {
        //console.log(password);
        this.outputPassword.value = password;

        this.outputPassword.classList.add('password_input_blink');
    
        setTimeout(() => {
            this.outputPassword.classList.remove('password_input_blink');
        }, 230); 
    }

    #OnAddRawPasswordButtonClick()
    {
        this.controller.OnAddRawPasswordButtonClick();
    }
    #OnOutputPasswordCopyButtonClick()
    {
        CopyToClipboard(this.outputPassword.value);
    }
    #OnExportButtonClick()
    {
        this.controller.OnExportButtonClick();
    }
    #OnInputButtonClick()
    {
        this.controller.OnImportButtonClick();
    }
    #OnReturnToMasterPasswordButtonClick()
    {
        this.controller.OnReturnToMasterPasswordButtonClick();
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