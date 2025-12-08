const multer= require ("multer");
const path= require("path");
const storage= multer.diskStorage({

    destination: function(req, file, cb){
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function(req,file,cb){
        cb(null, Date.now()+ "-"+file.originalname );
    }
    // destination: "uploads",
    // filename:(req,file,cb)=>{
    //     cb(null, Date.now()+ "-"+ file.originalname);
    // }
});
const fileFilter= (req,file,cb)=>{
    const allowedTypes=["application/pdf", "video/mp4"];
    if(!allowedTypes.includes(file.mimetype)){
        cb(new Error(" Only PDF and MP4 allowed"), false);
    }else{
        cb(null, true);
    }
};
const upload= multer({
    storage,
    limits:{fileSize: 20*1024*1024},
    fileFilter
});
module.exports=upload;