const API_BASE = "http://localhost:3000/api";
// Token management
export function saveToken(token) {
    localStorage.setItem("authToken", token);
}

export function getToken() {
    return localStorage.getItem("authToken");
}

// Helper to handle fetch response
export async function handleResponse(res) {
    let data;
    try {
        data = await res.json();
    } catch {
        data = {};
    }
    if (!res.ok) {
        const msg = data.message || res.statusText || "API request failed";
        throw new Error(msg);
    }
    return data;
}

export async function postJSON(path, body, auth = false) {
    const headers = { "Content-Type": "application/json" };

    if (auth) {
        const t = getToken();
        if (t) headers["Authorization"] = "Bearer " + t;
    }

    const res = await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
    });

    return handleResponse(res);
}
// for uploads
export async function postForm(path, formData, auth = false) {
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
//get request

export async function getJSON(path, auth = false) {
    const headers = {};

    if (auth) {
        const t = getToken();
        if (t) headers["Authorization"] = "Bearer " + t;
    }

    const res = await fetch(`${API_BASE}${path}`, {
        method: "GET",
        headers
    });

    return res.json();
}


// delete

export async function del(path, auth = false) {
    const headers = {};

    if (auth) {
        const t = getToken();
        if (t) headers["Authorization"] = "Bearer " + t;
    }

    const res = await fetch(`${API_BASE}${path}`, {
        method: "DELETE",
        headers
    });

    return res.json();
}