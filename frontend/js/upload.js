import { postForm } from "../api.js";
document.getElementById("uploadForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", document.getElementById("file").files[0]);
    formData.append("privacy", document.getElementById("privacy").value);


    const res = await postForm("/upload", fd, true);
    const msg=document.getElementById("message");
    //msg.innerText = res.message;
    if (res.message === "File uploaded successfully") {
        msg.innerText = "File uploaded!";
        msg.style.color = "green";
    } else {
        msg.innerText = res.message;
        msg.style.color = "red";
    }
}
);