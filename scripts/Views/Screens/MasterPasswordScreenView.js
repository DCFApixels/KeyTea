
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
       this.controller.Login(this.#masterPassword);
    }

    #PrivateUpdateButton()
    {
        this.passwordButton.disabled = !this.#masterPassword > 0;
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