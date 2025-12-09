import { postJSON, saveToken } from "../api.js";

const form = document.getElementById("loginForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const res = await postJSON("/login", { email, password });

        if (res && res.token) {
            saveToken(res.token);
            msg.innerText = "✅ Login successful! Redirecting...";
            msg.style.color = "green";
            form.reset();
            setTimeout(() => {
                window.location.href = "upload.html"; // go to upload page after login
            }, 1000);
        } else {
            msg.innerText = res.message || "Invalid credentials";
            msg.style.color = "red";
        }
    } catch (err) {
        msg.innerText = err.message || "Server error";
        msg.style.color = "red";
    }
});
