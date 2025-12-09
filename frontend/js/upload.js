import { postForm } from "../api.js";
async function uploadNow() {
    const fd = new FormData();
    fd.append("file", file.files[0]);
    fd.append("privacy", privacy.value);

    const res = await postForm("/upload", fd, true);
    msg.innerText=res.message;
}
