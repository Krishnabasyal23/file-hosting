const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const upload = require("../config/multer");
const { register, login } = require("../controllers/authController");
const {
    uploadFile,
    getPublicFiles,
    getMyFiles,
    deleteFile,
    downloadFile,
    streamFile,
    publicStreamFile,
    searchFiles,
    getFileDetails,
    filterFiles

} = require("../controllers/fileController");
router.post("/register", register);
router.post("/login", login);
router.post("/upload", authMiddleware, upload.single("file"), uploadFile);
router.get("/public-files", getPublicFiles);
router.get("/my-files", authMiddleware, getMyFiles);
router.get("/files/:id/download", authMiddleware, downloadFile);
router.get("/files/:id/stream", authMiddleware, streamFile);
router.get("/public/files/:id/stream", publicStreamFile);
router.get("/search", authMiddleware, searchFiles);
router.get("/files/:id", authMiddleware, getFileDetails);
router.get("/filter", authMiddleware, filterFiles);
//router.delete("/files/:id", deleteFile);
router.delete("/files/:id", authMiddleware, deleteFile);

module.exports = router;