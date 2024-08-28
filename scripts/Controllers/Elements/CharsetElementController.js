
class CharsetElementController
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
        this.view.name = model.name;
        this.view.Show();
    }



    OnUserSelect()
    {
        this.parentController.OnCharsetElementSelected(this.model.myuid);
    }
    OnEditButtonClick()
    {
        this.parentController.OnEditCharsetButtonClick(this.model.myuid);
    }
    OnDeleteButtonClick()
    {
        this.parentController.OnDeleteCharsetButtonClick(this.model.myuid);
    }



    Select(isNotInvoke)
    {
        this.view.isSelected = true;
        if(isNotInvoke || isNotInvoke == undefined)
        {
            this.parentController.OnCharsetElementSelected(this.model.myuid);
        }
    }
    Deselect() { this.view.isSelected = false; }

    Open() { this.view.Open(); }
    Close() { this.view.Close(); }
}