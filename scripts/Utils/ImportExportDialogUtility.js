class ImportExportDialogUtility
{
    static OpenImportDialog(callback)
    {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.classList.add("hidden");

        fileInput.addEventListener("change", function(e)
        {
            const file = e.target.files[0];
            if(!file)
            {
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e)
            {
                const contents = e.target.result;
                callback(contents);
            };
            reader.readAsText(file);
        });

        fileInput.click();
    }

    static OpenExportJsonDialog(exportJson)
    {
        const textToSaveAsBlob = new Blob([exportJson], { type: "application/json" });
        const fileNameToSaveAs = "userdata.json";
        const downloadUrl = URL.createObjectURL(textToSaveAsBlob);
        const downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.href = downloadUrl;
        downloadLink.click();
        setTimeout(() => URL.revokeObjectURL(downloadUrl), 0);
    }
}
