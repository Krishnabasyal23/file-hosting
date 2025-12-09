import { getJSON, del } from "../api.js";
async function loadFiles() {
    const files = await getJSON("/my-files", true);
    list.innerHTML = "";
    files.forEach(f => {
        const row = document.createElement("div");
        row.className = "item";
        row.innerHTML = `
            <span>${f.filename} (${f.size} bytes)</span>
            <div class="actions">
                <a href="http://localhost:3000/api/files/${f._id}/download"
                class="btn small">Download</a>
                <button class="btn small" onclick="removeFile('${f._id}')">Delete</button>
            </div>
        `;

        list.appendChild(row);
    });
}
async function removeFile(id){
    const res=await del(`/files/${id}`,true);
        alert(res.message);
        loadFiles();
}
        loadFiles();