import { getJSON } from "../api.js";

const publicFiles = document.getElementById("publicFiles");
const msg = document.getElementById("msg");

async function loadPublicFiles() {
    try {
        const files = await getJSON("/public-files");
        if (!files.length) {
            publicFiles.innerHTML = "<p>No public files available.</p>";
            return;
        }

        publicFiles.innerHTML = "";
        files.forEach(file => {
            const div = document.createElement("div");
            div.className = "file-item";
            div.innerHTML = `
                <span>${file.filename} (${(file.size/1024).toFixed(1)} KB)</span>
                <div>
                    <button onclick="downloadFile('${file._id}')">Download</button>
                </div>
            `;
            publicFiles.appendChild(div);
        });
    } catch (err) {
        msg.innerText = err.message || "Failed to load public files";
        msg.style.color = "red";
    }
}

window.downloadFile = (id) => {
    window.open(`http://localhost:3000/api/files/${id}/download`, "_blank");
}

// Load on page load
loadPublicFiles();
