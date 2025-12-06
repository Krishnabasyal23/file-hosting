const File= require("../models/File");
exports.uploadFile= async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({message:"No file uploaded"})
        }
        const{ privacy}= req.body;
        const file= new file({
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size,
            privacy: privacy || "private"
        });
        await file.save();
        res.status(201).json({
            message:"File uploaded successfully",
            file
        });
    } catch (error){
        res.status(500).json({message: "Upload failed", error});
    }
};
exports.getPUblicFiles= async(req,res)=>{
    const files= await File.find({privacy: "public"});
    res.json(files);
};
exports.getMyFiles= async (req, res)=>{
    const files= await File.find({ uploaded_by:"test-user"});
    exports.json(files);
};
exports.deleteFile= async (req,res)=>{
    const file= await File.findById(req.params.id);

    if(!file){
        return res.status(404).json({message: "File not found"});
    }
    await File.findByIdAndDelete(req.params.id);
    res.json({message:"File deleted"});
};