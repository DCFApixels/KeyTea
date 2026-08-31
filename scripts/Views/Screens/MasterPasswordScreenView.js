
class MasterPasswordScreenView extends ViewBase
{
    #masterPassword = "";

    constructor()
    {
        super();
        this.root = document.querySelector("#login_screen .form");
        
        this.passwordField = this.root.querySelector("#master_password_field");
        this.passwordButton = this.root.querySelector("#master_password_continue_button");

        this.passwordField.addEventListener('input', this.#OnPasswordFieldInput.bind(this));
        this.passwordButton.addEventListener('click', this.#OnPasswordButtonClick.bind(this));

        this.#PrivateUpdateButton();
    }

    #OnPasswordFieldInput(event)
    {
        this.#masterPassword = event.target.value;
        this.#PrivateUpdateButton();
    }

    #OnPasswordButtonClick()
    {
        const masterPassword = this.#masterPassword;
        this.Reset();
        this.controller.Login(masterPassword);
    }

    #PrivateUpdateButton()
    {
        this.passwordButton.disabled = this.#masterPassword.length <= 0;
    }

    Reset()
    {
        this.#masterPassword = "";
        this.passwordField.value = "";
        this.#PrivateUpdateButton();
    }

    Open()
    {
        this.Reset();
        this.root.classList.remove('disabled');
        this.ShowRoot(this.root);
    }
    Close()
    {
        //this.root.classList.add('disabled');
        this.HideRoot(this.root);
    }
}
