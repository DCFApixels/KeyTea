class SelectScreen
{
    SelectScreen()
    {
        this.root = document.getElementById("select_screen");

        this.passwordsList = this.root.querySelector("#passwords_list");

        this.outputPassword = this.root.querySelector("#output_password");
        this.outputPasswordCopyButton = this.root.querySelector("#output_password_copy_button");

        this.outputPasswordCopyButton = this.root.querySelector("#user_data_export_button");
        this.outputPasswordCopyButton = this.root.querySelector("#user_data_import_button");
    }
}