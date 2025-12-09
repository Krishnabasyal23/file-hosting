import { getJSON, del } from "../api.js";
const fileList= document.getElementById("fileList");
async function loadFiles() {
    try{
    const files = await getJSON("/my-files", true);//auth
    list.innerHTML = "";
    files.forEach(f => {
        const li = document.createElement("li");
            li.innerHTML = `
                ${f.filename} (${f.privacy})
                <button onclick="downloadFile('${f._id}')">Download</button>
            `;
            fileList.appendChild(li);
        });
    } catch (err) {
        fileList.innerHTML = `<li style="color:red">${err.message}</li>`;
    }
}
async function downloadFile(id){
    const token=localStorage.getItem("authToken");
    const res=await fetch(`http://localhost:3000/api/files/${id}/download`, {
        headers: { "Authorization": "Bearer " + token }
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "file";
    document.body.appendChild(a);
    a.click();
    a.remove();
}
loadMyFiles();
window.downloadFile=downloadFile;