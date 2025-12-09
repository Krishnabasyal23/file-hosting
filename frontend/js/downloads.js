import { getJSON } from "../api.js";

async function loadPublic() {
    const files = await getJSON("/public-files");
    list.innerHTML = "";
    files.forEAch(f => {
        const row = document.createElement("div");
        row.className = "item";
        row.innerHTML =
            row.innerHTML = `
            <span>${f.filename}</span>
            <a class="btn small" href="http://localhost:3000/api/files/${f._id}/download">Download</a>
        `;

        list.appendChild(row);
    });
}
    loadPublic();
