const express= requrie("express");
const router= express.Router();
const {register, login}= requrie("../controllers/authController");

router.post("/register", register);
router.post("login", login);
module.exports=router;