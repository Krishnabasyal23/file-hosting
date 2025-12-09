import { getToken, saveToken } from "./api.js";

// Show username if logged in
const usernameDisplay = document.getElementById("usernameDisplay");
const logoutBtn = document.getElementById("logoutBtn");

const token = getToken();
if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    usernameDisplay.innerText = payload.username || "User";
    logoutBtn.style.display = "inline-block";
} else {
    usernameDisplay.innerText = "";
    logoutBtn.style.display = "none";
}

// Logout function
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("authToken");
    window.location.href = "login.html"; // redirect to login
});
