class ImportExportDialogUtility
{
    static OpenImportDialog(callback)
    {
        var fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.style.display = "none";

        fileInput.onchange = function(e)
        {
            var file = e.target.files[0];
            if(!file)
            {
                return;
            }

            var reader = new FileReader();
            reader.onload = function(e)
            {
                var contents = e.target.result;
                callback(contents);
                //console.log("Import: \n\n" + contents);
            }
            reader.readAsText(file);
        }

        fileInput.click();
    }

    static OpenExportJsonDialog(exportJson)
    {
        var textToSaveAsBlob = new Blob([exportJson], { type: "text/plain" });
        var fileNameToSaveAs = "userdata.txt";

        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Скачать файл";
        if (window.webkitURL != null) {
            // Chrome allows the link to be clicked without actually adding it to the DOM.
            downloadLink.href = window.webkitURL.createObjectURL(textToSaveAsBlob);
        } else {
            // Firefox requires the link to be added to the DOM before it can be clicked.
            downloadLink.href = window.URL.createObjectURL(textToSaveAsBlob);
            downloadLink.onclick = function(event) {
                document.body.removeChild(event.target);
            };
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }
    
        downloadLink.click();
    }
}