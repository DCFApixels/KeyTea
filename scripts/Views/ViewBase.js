class ViewBase
{
    #hideAnimationEndHandler;
    #hideAnimationFallback;

    constructor() { }

    controller;
    SubscribeController(controller)
    {
        this.controller = controller;
    }

    ShowRoot(root)
    {
        this.#CancelPendingHide(root);
        root.classList.remove("hidden", "closing");
    }

    HideRoot(root)
    {
        if(root.classList.contains("hidden") || root.classList.contains("closing"))
        {
            return;
        }

        this.#CancelPendingHide(root);

        this.#hideAnimationEndHandler = event => {
            if(event.target === root && event.animationName === "formToHidden")
            {
                this.#FinishHide(root);
            }
        };

        root.addEventListener("animationend", this.#hideAnimationEndHandler);
        this.#hideAnimationFallback = setTimeout(() => this.#FinishHide(root), 450);
        root.classList.add("closing");
    }

    #FinishHide(root)
    {
        if(root.classList.contains("closing") === false)
        {
            return;
        }

        this.#CancelPendingHide(root);
        root.classList.add("hidden");
        root.classList.remove("closing");
    }

    #CancelPendingHide(root)
    {
        if(this.#hideAnimationEndHandler != null)
        {
            root.removeEventListener("animationend", this.#hideAnimationEndHandler);
            this.#hideAnimationEndHandler = null;
        }
        if(this.#hideAnimationFallback != null)
        {
            clearTimeout(this.#hideAnimationFallback);
            this.#hideAnimationFallback = null;
        }
    }
}
