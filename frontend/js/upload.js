import { postJSON, saveToken } from "../api.js";

const form = document.getElementById("loginForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("file");
    const privacy = document.getElementById("privacy").value;

    if (!fileInput.files.length) {
        msg.innerText = "Please select a file";
        msg.style.color = "red";
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("privacy", privacy);

    try {
        const res = await postForm("/upload", formData, true);
        if (res.File) {
            msg.innerText = "File uploaded successfully!";
            msg.style.color = "green";
            form.reset();
        } else {
            msg.innerText = res.message || "Upload failed";
            msg.style.color = "red";
        }
    } catch (err) {
        msg.innerText = err.message || "Server error";
        msg.style.color = "red";
    }
});
