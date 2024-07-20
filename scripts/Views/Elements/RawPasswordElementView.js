class RawPasswordElementView extends ViewBase
{
    #root;
    //#checkbox;
    #label;
    #settingsButton;
    #deleteButton;

    get name() { return this.#label.innerText; }
    set name(value) { this.#label.innerText = value; }
    get isSelected() { return this.#root.classList.contains("checked"); }
    set isSelected(value) 
    { 
        if(value)
        {
            this.#root.classList.add("checked")
        }
        else
        {
            this.#root.classList.remove("checked")
        }
    }

    constructor(root, checkbox, label, settingsButton, deleteButton)
    {
        super();
        this.#root = root;
        //this.#checkbox = checkbox;
        this.#label = label;
        this.#settingsButton = settingsButton;
        this.#deleteButton = deleteButton;

        this.#root.addEventListener('click', this.#OnCheckboxClicked.bind(this));
        this.#settingsButton.addEventListener('click', this.#OnSettingsButtonClicked.bind(this));
        this.#deleteButton.addEventListener('click', this.#OnDeleteButtonClicked.bind(this));
    }

    #OnCheckboxClicked()
    {
        this.controller.OnUserSelect();
    }
    #OnSettingsButtonClicked()
    {
        this.controller.OnEditButtonClick();
    }
    #OnDeleteButtonClicked()
    {
    }








    
    static Create(targetElem)
    {
        let lielem = document.createElement("li");
        let divelem = document.createElement("div");
        divelem.classList.add("passwords_list_element");
        lielem.appendChild(divelem);

        let result = new RawPasswordElementView(
            divelem,
            null,//document.createElement("input"),
            document.createElement("label"),
            document.createElement("button"),
            document.createElement("button"));

        result.#settingsButton.type = "button";
        result.#deleteButton.type = "button";
        //result.#checkbox.type = 'checkbox';

        result.#settingsButton.classList = "trnsp icon_button setting";
        result.#deleteButton.classList = "trnsp icon_button delete";

        //divelem.appendChild(result.#checkbox);
        divelem.appendChild(result.#label);
        divelem.appendChild(result.#settingsButton);
        divelem.appendChild(result.#deleteButton);

        targetElem.appendChild(lielem);


        return result;
    }
}