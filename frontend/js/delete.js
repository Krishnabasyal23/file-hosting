async function deleteFile(id) {
    const token = localStorage.getItem("authToken");
    try {
        const res = await fetch(`http://localhost:3000/api/files/${id}`, {
            method: "DELETE",
            headers: { "Authorization": "Bearer " + token }
        });
        alert(res.message);
        loadMyFiles(); // refresh list
    } catch (err) {
        alert(err.message || "Delete failed");
    }
}
window.deleteFile = deleteFile;
