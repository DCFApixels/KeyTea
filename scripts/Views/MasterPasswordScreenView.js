class MasterPasswordScreenView
{
    #passwordField
    #continueButton

    #passwordProperty = new PropertyChannel("");
    #continueButtonPressedProperty = new PropertyChannel(false);

    get password() {return this.#passwordProperty}
    get continueButtonPressed() {return this.#continueButtonPressedProperty}

    constructor(passwordField, continueButton)
    {
        this.#passwordField = passwordField;
        this.#continueButton = continueButton;

        this.#passwordProperty
            .SubscribeToInput(passwordField)
            .SubscribeView(passwordField, passwordField.SetValueFromModel);
        this.#continueButtonPressedProperty
            .SubscribeToPressed(continueButton);
    }

    Destroy(){
    }

    static CreateFor(element)
    {
        let passwordField = element.querySelector("#master_password_field");
        let passwordButton = element.querySelector("#master_password_continue_button");

        let x = new MasterPasswordScreenView(passwordField, passwordButton);
    }
}

MasterPasswordScreenView.CreateFor(document.getElementById("login_screen"));
