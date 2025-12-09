console.log("Main JS loaded");

import { postJSON, postForm, getJSON, saveToken, getToken, del } from "./api.js";

const content = document.getElementById("content");
const userInfo = document.getElementById("userInfo");
const logoutBtn = document.getElementById("logoutBtn");

// Navigation
document.getElementById("nav-register").onclick = () => showRegister();
document.getElementById("nav-login").onclick = () => showLogin();
document.getElementById("nav-upload").onclick = () => showUploadForm();
document.getElementById("nav-myfiles").onclick = () => showMyFiles();
document.getElementById("nav-public").onclick = () => showPublicFiles();

logoutBtn.onclick = () => { localStorage.removeItem("authToken"); location.reload(); }

function showRegister() {
    content.innerHTML = `
    <h2>Register</h2>
    <input id="reg_user" placeholder="Username"><br>
    <input id="reg_email" placeholder="Email"><br>
    <input id="reg_pass" type="password" placeholder="Password"><br>
    <button id="reg_btn">Register</button>
    <div id="reg_msg"></div>`;
    document.getElementById("reg_btn").onclick = async () => {
        const res = await postJSON("/register", {
            username: document.getElementById("reg_user").value,
            email: document.getElementById("reg_email").value,
            password: document.getElementById("reg_pass").value
        });
        document.getElementById("reg_msg").innerText = res.message || JSON.stringify(res);
    }
}

function showLogin() {
    content.innerHTML = `
    <h2>Login</h2>
    <input id="log_email" placeholder="Email"><br>
    <input id="log_pass" type="password" placeholder="Password"><br>
    <button id="log_btn">Login</button>
    <div id="log_msg"></div>`;
    document.getElementById("log_btn").onclick = async () => {
        const res = await postJSON("/login", {
            email: document.getElementById("log_email").value,
            password: document.getElementById("log_pass").value
        });
        if (res.token) {
            saveToken(res.token);
            location.reload();
        } else {
            document.getElementById("log_msg").innerText = res.message || JSON.stringify(res);
        }
    }
}

function showUploadForm() {
    content.innerHTML = `
    <h2>Upload File</h2>
    <input type="file" id="file_input"><br>
    <select id="privacy">
    <option value="private">Private</option>
    <option value="public">Public</option>
    </select><br>
    <button id="upload_btn">Upload</button>
    <div id="upload_msg"></div>`;
    document.getElementById("upload_btn").onclick = async () => {
        const fileInput = document.getElementById("file_input");
        if (!fileInput.files[0]) {
            alert("Select a file");
            return;
        }
        const form = new FormData();
        form.append("file", fileInput.files[0]);
        form.append("privacy", document.getElementById("privacy").value);

        const res = await postForm("/upload", form, true);
        document.getElementById("upload_msg").innerText = res.message || JSON.stringify(res);
    }
}

async function showMyFiles() {
    content.innerHTML = `<h2>My Files</h2><div id="my_list"></div>`;
    const files = await getJSON("/my-files", true);
    const container = document.getElementById("my_list");
    if (!Array.isArray(files)) { container.innerText = JSON.stringify(files); return; }
    container.innerHTML = files.map(f =>
        `<div class="item">
    <span>${f.filename} (${f.privacy})</span>
    <span>
        <button onclick="downloadFile('${f._id}')">Download</button>
        <button onclick="deleteFile('${f._id}')">Delete</button>
    </span>
    </div>`
    ).join("");
}

async function showPublicFiles() {
    content.innerHTML = `<h2>Public Files</h2><div id="pub_list"></div>`;
    const files = await getJSON("/public-files", false);
    const container = document.getElementById("pub_list");
    if (!Array.isArray(files)) { container.innerText = JSON.stringify(files); return; }
    container.innerHTML = files.map(f =>
        `<div class="item">
    <span>${f.filename}</span>
    <button onclick="downloadFile('${f._id}')">Download</button>
    </div>`
    ).join("");
}

window.downloadFile = async (id) => {
    const t = getToken();
    const headers = {};
    if (t) headers["Authorization"] = "Bearer " + t;
    const res = await fetch(`http://localhost:3000/api/files/${id}/download`, {
        method: "GET",
        headers
    });
    if (!res.ok) {
        const e = await res.json();
        alert(e.message || "Download error");
        return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "";
    a.click();
    URL.revokeObjectURL(url);
};

window.deleteFile = async (id) => {
    const res = await del(`/files/${id}`, true);
    alert(res.message || JSON.stringify(res));
    showMyFiles();
};
// On page load
if (getToken()) {
    logoutBtn.style.display = 'inline-block';
    userInfo.innerText = "Logged in";
    showUploadForm();
} else {
    showRegister();
}