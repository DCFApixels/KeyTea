class MasterPasswordScreenView
{
    #passwordField
    #continueButton

    #passwordProperty
    #continueButtonPressedProperty

    get password() {return this.#passwordProperty}
    get continueButtonPressed() {return this.#continueButtonPressedProperty}

    constructor(passwordField, continueButton)
    {
        this.#passwordField = passwordField;
        this.#continueButton = continueButton;

        this.#passwordProperty = new PropertyChannel("", (value) => {
            this.#passwordField.value = value;
        });
        this.#continueButtonPressedProperty = new PropertyChannel(false);

        let continueButtonPressedProperty = this.#continueButtonPressedProperty;
        continueButton.onmousedown = function() {
            continueButtonPressedProperty.SetValue(true, true)
        };
        continueButton.onmouseup = function() {
            continueButtonPressedProperty.SetValue(false, true);
        };
    }

    static CreateFor(element)
    {
        let passwordField = element.querySelector("#master_password_field");
        let passwordButton = element.querySelector("#master_password_continue_button");

        let x = new MasterPasswordScreenView(passwordField, passwordButton);
    }
}

MasterPasswordScreenView.CreateFor(document.getElementById("login_screen"));
