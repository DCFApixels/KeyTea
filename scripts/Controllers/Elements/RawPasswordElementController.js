
class RawPasswordElementController
{
    model;
    view;
    parentController;
    number;
    
    constructor(model, view, parentController, number)
    {

        this.view = view;
        this.parentController = parentController;
        this.number = number;
        this.SetModel(model);
        this.view.SubscribeController(this);
    }

    SetModel(model)
    {
        this.model = model;
        this.view.name = model.name;
    }



    OnUserSelect()
    {
        this.parentController.OnRawPasswordElementSelected(this.number);
    }
    OnEditButtonClick()
    {
        this.parentController.OnEditRawPasswordButtonClick(this.number);
    }

    Select() { this.view.isSelected = true; }
    Deselect() { this.view.isSelected = false; }

    Open() { this.view.Open(); }
    Close() { this.view.Close(); }
}