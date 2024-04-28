document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "https://api.github.com/repos/haynako0/ipynb_site/contents/ipynb";
    // Hello for those who want to make their own! You need to change the API accordingly for this to work. - Erl Softer
    // https://api.github.com/repos/(GitHub Username)/(Repository)/contents/(Folder Name)

    async function fetchNotebooks() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching notebooks:", error);
            return [];
        }
    }

    async function renderNotebookPreviews() {
        const previewContainer = document.getElementById("preview-container");
        const notebooks = await fetchNotebooks();

        if (notebooks.length === 0) {
            previewContainer.innerHTML = "<h2>No notebooks found.</h2>";
            return;
        }

        let row;
        notebooks.forEach((notebook, index) => {
            if (notebook.name.endsWith(".ipynb")) {
                if (index % 2 === 0) {
                    row = document.createElement("div");
                    row.classList.add("row", "mb-4");
                    previewContainer.appendChild(row);
                }

                // Hello for those who want to make their own! You need to change these links accordingly to your own links for this to work. - Erl Softer
                // Just change "haynako0", "ipynb_site", "main" and "ipynb" accordingly.
                const notebookUrl = `https://nbviewer.jupyter.org/github/haynako0/ipynb_site/blob/main/ipynb/${notebook.name}`;
                const repoUrl = `https://github.com/haynako0/ipynb_site/blob/main/ipynb/${notebook.name}`;
                const colabUrl = `https://colab.research.google.com/github/haynako0/ipynb_site/blob/main/ipynb/${notebook.name}`;

                const notebookPreview = document.createElement("div");
                notebookPreview.classList.add("col-md-6", "mb-4", "notebook-preview", "border", "p-3");

                const notebookTitle = document.createElement("h3");
                notebookTitle.textContent = notebook.name.replace(".ipynb", "");
                notebookPreview.appendChild(notebookTitle);

                const notebookIframe = document.createElement("iframe");
                notebookIframe.src = notebookUrl;
                notebookIframe.title = "Jupyter Notebook Preview";
                notebookIframe.allowFullscreen = true;
                notebookIframe.style.height = "300px";
                notebookIframe.style.width = "100%";
                notebookIframe.setAttribute("sandbox", "allow-same-origin allow-scripts");
                notebookPreview.appendChild(notebookIframe);

                const repoButton = document.createElement("a");
                repoButton.href = repoUrl;
                repoButton.textContent = "View in Github";
                repoButton.classList.add("btn", "btn-primary", "mt-2", "me-2");
                repoButton.target = "_blank";
                notebookPreview.appendChild(repoButton);

                const nbviewerButton = document.createElement("a");
                nbviewerButton.href = notebookUrl;
                nbviewerButton.textContent = "View in nbviewer";
                nbviewerButton.classList.add("btn", "btn-success", "mt-2", "me-2");
                nbviewerButton.target = "_blank";
                notebookPreview.appendChild(nbviewerButton);

                const colabButton = document.createElement("a");
                colabButton.href = colabUrl;
                colabButton.textContent = "Open in Google Colab";
                colabButton.classList.add("btn", "btn-warning", "mt-2");
                colabButton.target = "_blank";
                notebookPreview.appendChild(colabButton);

                const currentRow = previewContainer.lastElementChild;
                currentRow.appendChild(notebookPreview);
            }
        });
        
    }

    renderNotebookPreviews();
});
