class RawPasswordElement{
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
}
