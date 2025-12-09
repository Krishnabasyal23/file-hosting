import { getJSON, del } from "../api.js";
const fileList= document.getElementById("fileList");
const msg = document.getElementById("msg");

async function loadFiles() {
    try{
    const files = await getJSON("/my-files", true);
        if (!files.length) {
            filesList.innerHTML = "<p>No files uploaded yet.</p>";
            return;
        }

        filesList.innerHTML = "";
        files.forEach(file => {
            const div = document.createElement("div");
            div.className = "file-item";
            div.innerHTML = `
                <span>${file.filename} (${(file.size/1024).toFixed(1)} KB) - ${file.privacy}</span>
                <div>
                    <button onclick="downloadFile('${file._id}','${file.filename}')">Download</button>
                    <button onclick="deleteFile('${file._id}')">Delete</button>
                </div>
            `;
            filesList.appendChild(div);
        });
    } catch (err) {
        msg.innerText = err.message || "Failed to load files";
        msg.style.color = "red";
    }
}
window.downloadFile = (id, filename) => {
    window.open(`http://localhost:3000/api/files/${id}/download`, "_blank");
}

window.deleteFile = async (id) => {
    try {
        const res = await del(`/files/${id}`, true);
        if (res.message) {
            msg.innerText = res.message;
            msg.style.color = "green";
            loadFiles();
        }
    } catch (err) {
        msg.innerText = err.message || "Failed to delete file";
        msg.style.color = "red";
    }
}

loadFiles();