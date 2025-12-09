import { postJSON, saveToken } from "../api.js";

async function loginUser() {
    const res = await postJSON("/login", {
        email: email.value,
        password: password.value
    });

    if (res.token) {
        saveToken(res.token);
        msg.innerText = "Login successful!";
    } else {
        msg.innerText = res.message;
    }
}
