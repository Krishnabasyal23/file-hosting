const express= require("express");
const router=express.Router();
const upload= require ("../config/multer");
const { deleteFile}= require("../controllers/fileController")
const{
    uploadFile,
    getPublicFiles,
    getMyFiles,
    deleteFile

}= require("../controllers/fileController");
router.post("/upload", upload.single("file"), uploadFile);
router.get("/public-files", getPublicFiles);
router.get("/my-files", getMyFiles);
router.delete("/files/:id", deleteFile);
router.delete("/files/.id", authMiddleware, deleteFile);
module.exports=router;