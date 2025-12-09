import { postJSON } from "../api.js";

const form = document.getElementById("registerForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const res = await postJSON("/register", { username, email, password });

        if (res && res.message === "User registered successfully") {
            msg.innerText = "🎉 Registration successful! Redirecting to login...";
            msg.style.color = "green";
            form.reset();
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        } else {
            msg.innerText = res.message || "Something went wrong";
            msg.style.color = "red";
        }
    } catch (err) {
        msg.innerText = err.message || "Server error";
        msg.style.color = "red";
    }
});
