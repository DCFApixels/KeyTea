
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
        if(model == null)
        {
            this.view.name = "";
            this.view.Hide();
            return;
        }
        if(model.userName != null && model.userName != "")
        {
            this.view.name = model.name + " (" + model.userName + ")";
        }
        else
        {
            this.view.name = model.name;
        }
        this.view.Show();
    }



    OnUserSelect()
    {
        this.parentController.OnRawPasswordElementSelected(this.number);
    }
    OnEditButtonClick()
    {
        this.parentController.OnEditRawPasswordButtonClick(this.number);
    }
    OnDeleteButtonClick()
    {
        this.parentController.OnDeleteRawPasswordButtonClick(this.number);
    }

    Select() { this.view.isSelected = true; }
    Deselect() { this.view.isSelected = false; }

    Open() { this.view.Open(); }
    Close() { this.view.Close(); }
}