import { saveToken, getToken, postJSON, postForm, getJSON, del } from "./api.js";

const notice = document.getElementById("notice");

function show(msg) {
    notice.innerHTML = `<div class="notice">${msg}</div>`;
    setTimeout(() => notice.innerHTML = "", 2000);
}

function showPage(page) {
    document.getElementById("registerPage").style.display = "none";
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("appPage").style.display = "none";
    document.getElementById(page).style.display = "block";
}

// Page toggles
document.getElementById("goLogin").onclick = () => showPage("loginPage");
document.getElementById("goRegister").onclick = () => showPage("registerPage");

// Register
document.getElementById("btnRegister").onclick = async () => {
    const username = regUsername.value;
    const email = regEmail.value;
    const password = regPassword.value;

    const res = await postJSON("/register", { username, email, password });
    show(res.message);

    if (res.message === "User registered successfully")
        showPage("loginPage");
};

// Login
document.getElementById("btnLogin").onclick = async () => {
    const email = loginEmail.value;
    const password = loginPassword.value;

    const res = await postJSON("/login", { email, password });

    if (res.token) {
        saveToken(res.token);
        show("Login successful");
        loadFiles();
        showPage("appPage");
    } else {
        show(res.message || "Login failed");
    }
};

// Load Files
async function loadFiles() {
    const myFiles = await getJSON("/my-files", true);
    const pubFiles = await getJSON("/public-files");

    const myDiv = document.getElementById("myFiles");
    const pubDiv = document.getElementById("publicFiles");

    myDiv.innerHTML = "";
    pubDiv.innerHTML = "";

    myFiles.forEach(f => {
        myDiv.innerHTML += `
            <div class="item">
                ${f.filename}
                <div class="actions">
                    <button onclick="downloadFile('${f._id}')">Download</button>
                    <button onclick="deleteFile('${f._id}')">Delete</button>
                </div>
            </div>
        `;
    });

    pubFiles.forEach(f => {
        pubDiv.innerHTML += `
            <div class="item">
                ${f.filename}
                <button onclick="downloadFile('${f._id}')">Download</button>
            </div>
        `;
    });
}

// Upload
document.getElementById("btnUpload").onclick = async () => {
    const file = fileInput.files[0];
    const privacy = privacySelect.value;

    if (!file) return show("Select a file");

    const fd = new FormData();
    fd.append("file", file);
    fd.append("privacy", privacy);

    const res = await postForm("/upload", fd, true);
    show(res.message);
    loadFiles();
};

// Download
window.downloadFile = async (id) => {
    window.location = `http://localhost:3000/api/files/${id}/download`;
};

// Delete
window.deleteFile = async (id) => {
    const res = await del(`/files/${id}`, true);
    show(res.message);
    loadFiles();
};

// Logout
document.getElementById("logout").onclick = () => {
    localStorage.removeItem("authToken");
    show("Logged out");
    showPage("loginPage");
};
