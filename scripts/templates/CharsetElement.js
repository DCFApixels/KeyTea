class CharsetElement
{
    #checkbox
    #label;
    #settingsButton;
    #deleteButton;

    #nameProperty;
    #isSelectedProperty;
    #isSettingsButtonPressedProperty;
    #isDeleteButtonPressedProperty;

    get nameProperty() { return this.#nameProperty }
    get isSelectedProperty() { return this.#isSelectedProperty }
    get isSettingsButtonPressedProperty() { return this.#isSettingsButtonPressedProperty }
    get isDeleteButtonPressedProperty() { return this.#isDeleteButtonPressedProperty }

    constructor(checkbox, label, settingsButton, deleteButton){
        this.#checkbox = checkbox;
        this.#label = label;
        this.#settingsButton = settingsButton;
        this.#deleteButton = deleteButton;
 
        this.#nameProperty = new PropertyChannel("", (value) => {
            this.#label.innerHTML = value 
        });
        this.#isSelectedProperty = new PropertyChannel(false, (value) => {
            this.#checkbox.checked = value; 
        });
        this.#isSettingsButtonPressedProperty = new PropertyChannel(false);
        this.#isDeleteButtonPressedProperty = new PropertyChannel(false);

        settingsButton.onClick = function() {  }
    }

    static Create(targetElem){
        let lielem = document.createElement("li");
        let divelem = document.createElement("div");
        divelem.classList.add("passwords_list_element");
        lielem.appendChild(divelem);

        let result = new CharsetElement(
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

let elem = document.getElementById("passwords_list");

let elem1 = CharsetElement.Create(elem);
let elem2 = CharsetElement.Create(elem);
let elem3 = CharsetElement.Create(elem);
let elem4 = CharsetElement.Create(elem);
let elem5 = CharsetElement.Create(elem);
let elem6 = CharsetElement.Create(elem);
let elem8 = CharsetElement.Create(elem);
let elem9 = CharsetElement.Create(elem);
let elem10 = CharsetElement.Create(elem);
let elem11 = CharsetElement.Create(elem);
let elem12 = CharsetElement.Create(elem);
let elem13 = CharsetElement.Create(elem);
let elem14 = CharsetElement.Create(elem);
let elem15 = CharsetElement.Create(elem);

elem1.nameProperty.SetValue("12345", false)


elem = document.getElementById("charsets_list");

elem1 = CharsetElement.Create(elem);
elem2 = CharsetElement.Create(elem);
elem3 = CharsetElement.Create(elem);
elem4 = CharsetElement.Create(elem);
