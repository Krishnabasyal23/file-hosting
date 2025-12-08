const File = require("../models/File");
const fs = require("fs");
const stream = require("fs");
exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" })
        }
        const { privacy } = req.body;
        const File = new file({
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size,
            privacy: privacy || "private",
            uploaded_by: req.userId
        });
        await File.save();
        res.status(201).json({
            message: "File uploaded successfully",
            File
        });
    } catch (error) {
        res.status(500).json({ message: "Upload failed", error });
    }
};
exports.getPublicFiles = async (req, res) => {
    const files = await File.find({ privacy: "public" });
    res.json(files);
};
exports.getMyFiles = async (req, res) => {
    const files = await File.find({ uploaded_by: rq.userID });
    res.json(files);
};
// download files 
exports.downloadFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }
        // authetication and ownership check for private files
        if (file.privacy == "private" && String(file.uploaded_by != String(req.userID))) {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        res.download(file.path, file.filename); // serves the file
    }
    catch (err) {
        res.status(500).json({ message: "Download filed" });

    }
};
// exports.deleteFile = async (req, res) => {
//     const file = await File.findById(req.params.id);

//     if (!file) {
//         return res.status(404).json({ message: "File not found" });
//     }
//     await File.findByIdAndDelete(req.params.id);
//     res.json({ message: "File deleted" });
// };


// Delete file(owner only)
exports.deleteFile = async (req, res) => {
    try {
        const File = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }
        if (String(file.uploaded_by) !== String(req.userID)) {
            return res.status(403).json({ message: "Unauthorized delete attempt" });
        }
        // delete files form upload folder
        fs.unlink(File.path, async (err) => {
            if (err) {
                return res.status(500).json({ message: "Failed to delete file form storage" });
            }
            await file.deleteOne();
            res.json({ message: "File deleted successfully" });
        });
    }
    catch (err) {
        res.status(500).json({ message: "File deletion failed" });
    }
};

//  file streaming

exports.streamFile = async (req, res) => {
    try {
        const file = await file.findbyID(req.params.id);
        if (!file) return res.status(404).json({ message: "File not found" });
        if (file.pricacy == "private" && String(file.uploaded_by) != String(req.userID)) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const fileStream = stream.createReadStream(file.path);
        fileStream.pipe(res);
    } catch (error) {
        res.status(500).json({ message: "Streaming failed" });
    }
};

// public streaming
exports.publicStreamFile = async (req, res) => {
    try {
        const file = await File.findbyId(req.params.id);
        if (!file || file.privacy != "public") {
            return res.status(404).json({ message: "File not available publicly" })
        }
        const fileStream = stream.createReadStream(file.path);
        fileStream.pipe(res);
    } catch (error) {
        res.status(500).json({ message: "Public streaming failed" });
    }

};