const express = require("express");
const router = express.Router();
const { register, login} = require("../controllers/authController");
const { downloadFile, uploadFile, deleteFile } = require("../controllers/fileController");

router.post("/register", register);
router.post("/login", login);
router.get("/download", downloadFile);
router.post("/upload",uploadFile);
router.post("/delete", deleteFile);
module.exports = router;