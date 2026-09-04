
class MasterPasswordScreenView extends ViewBase
{
    #masterPassword = "";
    #loginInProgress = false;

    constructor()
    {
        super();
        this.root = document.querySelector("#login_screen .form");
        
        this.passwordField = this.root.querySelector("#master_password_field");
        this.passwordButton = this.root.querySelector("#master_password_continue_button");
        this.passwordError = this.root.querySelector("#master_password_error");
        this.clearUserDataButton = this.root.querySelector("#clear_user_data_button");

        this.clearUserDataDialog = document.querySelector("#clear_user_data_dialog");
        this.clearUserDataCancelButton = this.clearUserDataDialog.querySelector("#clear_user_data_cancel_button");
        this.clearUserDataConfirmButton = this.clearUserDataDialog.querySelector("#clear_user_data_confirm_button");
        this.clearUserDataError = this.clearUserDataDialog.querySelector("#clear_user_data_error");

        this.passwordField.addEventListener('input', this.#OnPasswordFieldInput.bind(this));
        this.passwordButton.addEventListener('click', this.#OnPasswordButtonClick.bind(this));
        this.clearUserDataButton.addEventListener('click', this.#OpenClearUserDataDialog.bind(this));
        this.clearUserDataCancelButton.addEventListener('click', this.#CloseClearUserDataDialog.bind(this));
        this.clearUserDataConfirmButton.addEventListener('click', this.#OnClearUserDataConfirmed.bind(this));
        this.clearUserDataDialog.addEventListener('click', this.#OnClearUserDataDialogClick.bind(this));
        this.clearUserDataDialog.addEventListener('keydown', this.#OnClearUserDataDialogKeyDown.bind(this));

        this.#PrivateUpdateButton();
    }

    #OnPasswordFieldInput(event)
    {
        this.#masterPassword = event.target.value;
        this.passwordError.classList.add("hidden");
        this.#PrivateUpdateButton();
    }

    async #OnPasswordButtonClick()
    {
        if(this.#loginInProgress || this.#masterPassword.length <= 0)
        {
            return;
        }

        let masterPassword = this.#masterPassword;
        this.Reset();
        this.#SetLoginInProgress(true);

        try
        {
            await this.controller.Login(masterPassword);
        }
        catch(error)
        {
            console.error("Unable to derive the master-password key.", error);
            this.passwordError.classList.remove("hidden");
            this.#SetLoginInProgress(false);
            this.passwordField.focus();
        }
        finally
        {
            masterPassword = "";
        }
    }

    #PrivateUpdateButton()
    {
        this.passwordButton.disabled = this.#loginInProgress || this.#masterPassword.length <= 0;
    }

    #SetLoginInProgress(value)
    {
        this.#loginInProgress = value;
        this.passwordField.disabled = value;
        this.clearUserDataButton.disabled = value;
        this.passwordButton.classList.toggle("loading", value);
        this.passwordButton.setAttribute("aria-busy", value.toString());
        this.passwordButton.setAttribute("aria-label", value ? "Generating password" : "Continue");
        this.#PrivateUpdateButton();
    }

    #OpenClearUserDataDialog()
    {
        this.clearUserDataError.classList.add("hidden");
        this.clearUserDataDialog.classList.remove("hidden");
        this.clearUserDataCancelButton.focus();
    }

    #CloseClearUserDataDialog()
    {
        this.clearUserDataDialog.classList.add("hidden");
        this.clearUserDataError.classList.add("hidden");
        this.clearUserDataButton.focus();
    }

    #OnClearUserDataConfirmed()
    {
        if(this.controller.ClearUserData())
        {
            this.Reset();
            this.#CloseClearUserDataDialog();
            return;
        }

        this.clearUserDataError.classList.remove("hidden");
    }

    #OnClearUserDataDialogClick(event)
    {
        if(event.target === this.clearUserDataDialog)
        {
            this.#CloseClearUserDataDialog();
        }
    }

    #OnClearUserDataDialogKeyDown(event)
    {
        if(event.key === "Escape")
        {
            event.preventDefault();
            this.#CloseClearUserDataDialog();
            return;
        }

        if(event.key !== "Tab")
        {
            return;
        }

        const firstButton = this.clearUserDataCancelButton;
        const lastButton = this.clearUserDataConfirmButton;

        if(event.shiftKey && document.activeElement === firstButton)
        {
            event.preventDefault();
            lastButton.focus();
        }
        else if(event.shiftKey === false && document.activeElement === lastButton)
        {
            event.preventDefault();
            firstButton.focus();
        }
    }

    Reset()
    {
        this.#masterPassword = "";
        this.passwordField.value = "";
        this.passwordError.classList.add("hidden");
        this.#PrivateUpdateButton();
    }

    Open()
    {
        this.clearUserDataDialog.classList.add("hidden");
        this.#SetLoginInProgress(false);
        this.Reset();
        this.root.classList.remove('disabled');
        this.ShowRoot(this.root);
    }
    Close()
    {
        this.HideRoot(this.root);
    }
}
