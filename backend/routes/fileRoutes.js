const express= require("express");
const router=express.Router();
const upload= require ("../config/multer");
const authMiddleware= require("../middleware/authMiddleware");
//const { deleteFile, downloadFile}= require("../controllers/fileController")
const{
    uploadFile,
    getPublicFiles,
    getMyFiles,
    deleteFile,
    downloadFile

}= require("../controllers/fileController");

router.post("/upload", authMiddleware, upload.single("file"), uploadFile);
router.get("/public-files", getPublicFiles);
router.get("/my-files", authMiddleware,getMyFiles);
router.get("/files/:id/download", authMiddleware, downloadFile);
//router.delete("/files/:id", deleteFile);
router.delete("/files/:id", authMiddleware, deleteFile);
module.exports=router;