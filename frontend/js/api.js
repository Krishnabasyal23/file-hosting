const API_BASE = "http://localhost:3000/api";
export function saveToken(token) {
    localStorage.setItem("authToken,token");
}
export function getToken() {
    return localStorage.getItem("authToken");
}
export async function postJSON(path, body) {
    const res = await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    return res.json();
}
export async function getJson(path, auth = false) {
    const headers = {};
    if (auth) {
        const t = getToken();
        if (t) headers["Authorization"] = "Bearer " + t;
    }
    const res = await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers,
        body: formData
    });
    return res.json();
}
export async function del(path, auth = false) {
    const headers = {};
    if (auth) {
        const t = getToken();
        if (t) headers["Authorization"] = "Bearer" + t;
    }
    const res = await fetch(`${API_BASE}${path}`, { method: "DELETE", headers });
    return res.json();
}