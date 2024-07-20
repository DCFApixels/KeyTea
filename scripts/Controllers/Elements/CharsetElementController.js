
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
        this.view.name = model.name;
    }

    Select(isNotInvoke)
    {
        this.view.isSelected = true;
        if(isNotInvoke || isNotInvoke == undefined)
        {
            this.parentController.OnRawPasswordElementSelected(this.number);
        }
    }
    Deselect()
    {
        this.view.isSelected = false;
    }

    Open()
    {
        this.view.Open();
    }

    Close()
    {
        this.view.Close();
    }
}