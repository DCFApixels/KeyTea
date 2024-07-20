class CharsetElementView extends ViewBase
{
    #checkbox
    #label;
    #settingsButton;
    #deleteButton;

    #controller;

    get name() { return this.#label.innerText; }
    set name(value) { this.#label.innerText = value; }
    get isSelected() { return this.#checkbox.checked }

    constructor(checkbox, label, settingsButton, deleteButton)
    {
        super();
        this.#checkbox = checkbox;
        this.#label = label;
        this.#settingsButton = settingsButton;
        this.#deleteButton = deleteButton;
    }


    static Create(targetElem)
    {
        let lielem = document.createElement("li");
        let divelem = document.createElement("div");
        divelem.classList.add("passwords_list_element");
        lielem.appendChild(divelem);

        let result = new CharsetElementView(
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

//let elem = document.getElementById("passwords_list");
//
//let elem1 = CharsetElementView.Create(elem);
//let elem2 = CharsetElementView.Create(elem);
//let elem3 = CharsetElementView.Create(elem);
//let elem4 = CharsetElementView.Create(elem);
//let elem5 = CharsetElementView.Create(elem);
//let elem6 = CharsetElementView.Create(elem);
//let elem8 = CharsetElementView.Create(elem);
//let elem9 = CharsetElementView.Create(elem);
//let elem10 = CharsetElementView.Create(elem);
//let elem11 = CharsetElementView.Create(elem);
//let elem12 = CharsetElementView.Create(elem);
//let elem13 = CharsetElementView.Create(elem);
//let elem14 = CharsetElementView.Create(elem);
//let elem15 = CharsetElementView.Create(elem);
//
//
//elem = document.getElementById("charsets_list");
//
//elem1 = CharsetElementView.Create(elem);
//elem2 = CharsetElementView.Create(elem);
//elem3 = CharsetElementView.Create(elem);
//elem4 = CharsetElementView.Create(elem);