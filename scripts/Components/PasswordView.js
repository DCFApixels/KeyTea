class PasswordElementPart
{
    #checkbox
    #label;
    #settingsButton;
    #deleteButton;

    //#nameProperty = new PropertyChannel("");
    //#isSelectedProperty = new PropertyChannel(false);
    //#isSettingsButtonPressedProperty =  new PropertyChannel(false);
    //#isDeleteButtonPressedProperty =  new PropertyChannel(false);

    //get name() { return this.#nameProperty }
    //get isSelected() { return this.#isSelectedProperty }
    //get isSettingsButtonPressed() { return this.#isSettingsButtonPressedProperty }
    //get isDeleteButtonPressed() { return this.#isDeleteButtonPressedProperty }

    constructor(checkbox, label, settingsButton, deleteButton){
        this.#checkbox = checkbox;
        this.#label = label;
        this.#settingsButton = settingsButton;
        this.#deleteButton = deleteButton;
    }

    Setup(passwordRecord)
    {

    }

    static Create(targetElem){
        let lielem = document.createElement("li");
        let divelem = document.createElement("div");
        divelem.classList.add("passwords_list_element");
        lielem.appendChild(divelem);

        let result = new CharsetView(
            document.createElement("input"),
            document.createElement("label"),
            document.createElement("button"),
            document.createElement("button"));

        result.#settingsButton.type = "button";
        result.#deleteButton.type = "button";
        result.#checkbox.type = 'checkbox';

        result.#settingsButton.classList = "trnsp icon_button setting";
        result.#deleteButton.classList = "trnsp icon_button delete";

        divelem.appendChild(result.#checkbox);
        divelem.appendChild(result.#label);
        divelem.appendChild(result.#settingsButton);
        divelem.appendChild(result.#deleteButton);

        targetElem.appendChild(lielem);

        return result;
    }
}