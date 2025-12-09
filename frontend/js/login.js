import { postJSON, saveToken } from "../api.js";
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const res = await postJSON("/login", { email, password });

   // const msg = document.getElementById("message");


    // async function loginUser() {
    //     const res = await postJSON("/login", {
    //         email: email.value,
    //         password: password.value
    //     });

    if (res.token) {
        saveToken(res.token);
        msg.innerText = "Login successful!";
        msg.style.color = "green";
        setTimeout(() => (window.location.href = "upload.html"), 800);
    } else {
        msg.innerText = res.message;
        msg.style.color = "red";
    }
}
);