class CharsetElement{
    #checkbox
    #label
    #settingsButton
    #deleteButton

    get checkbox() {
        return this.#checkbox
    }
    get label() {
        return this.#label
    }
    get settingsButton() {
        return this.#settingsButton
    }
    get deleteButton() {
        return this.#deleteButton
    }

    constructor(checkbox, label, settingsButton, deleteButton){
        this.#checkbox = checkbox;
        this.#label = label;
        this.#settingsButton = settingsButton;
        this.#deleteButton = deleteButton;
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

        result.settingsButton.type = "button";
        result.deleteButton.type = "button";
        result.checkbox.type = 'checkbox';

        result.settingsButton.classList = "trnsp icon_button setting";
        result.deleteButton.classList = "trnsp icon_button delete";

        divelem.appendChild(result.checkbox);
        divelem.appendChild(result.label);
        divelem.appendChild(result.settingsButton);
        divelem.appendChild(result.deleteButton);

        targetElem.appendChild(lielem);

        return result;
    }
}

let elem = document.getElementById("passwords_list");

let elem1 = CharsetElement.Create(elem);
let elem2 = CharsetElement.Create(elem);
let elem3 = CharsetElement.Create(elem);
let elem4 = CharsetElement.Create(elem);

elem1.label.innerHTML  = "elem 1";
elem2.label.innerHTML  = "elem 2";
elem3.label.innerHTML  = "elem 3";
elem4.label.innerHTML  = "elem 4";


elem = document.getElementById("charsets_list");

elem1 = CharsetElement.Create(elem);
elem2 = CharsetElement.Create(elem);
elem3 = CharsetElement.Create(elem);
elem4 = CharsetElement.Create(elem);

elem1.label.innerHTML  = "elem 1";
elem2.label.innerHTML  = "elem 2";
elem3.label.innerHTML  = "elem 3";
elem4.label.innerHTML  = "elem 4";