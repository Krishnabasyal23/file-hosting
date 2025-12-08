const File = require("../models/File");
const fs = require("fs");
//const stream = require("fs");


exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" })
        }
        const { privacy } = req.body;
        const fileDoc = new File({
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size,
            privacy: privacy || "private",
            uploaded_by: req.user.id
        });
        await fileDoc.save();
        res.status(201).json({
            message: "File uploaded successfully",
            File: fileDoc
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
    try {
        const files = await File.find({ uploaded_by: req.user.id });
        res.json(files);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch files", error: err.message })
    }
};
// download files
exports.downloadFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }
        // authetication and ownership check for private files
        if (file.privacy === "private" && String(file.uploaded_by) !== String(req.user.id)) {
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
        const fileDoc = await File.findById(req.params.id);
        if (!fileDoc) {
            return res.status(404).json({ message: "File not found" });
        }
        if (String(fileDoc.uploaded_by) !== String(req.user.id)) {
            return res.status(403).json({ message: "Unauthorized delete attempt" });
        }
        // delete files form upload folder
        fs.unlink(fileDoc.path, async (err) => {
            if (err) {
                //console.error("Delete error:",err);
                return res.status(500).json({ message: "Failed to delete file form storage" });
            }
            await fileDoc.deleteOne();
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
        const fileDoc = await File.findById(req.params.id);
        if (!fileDoc) return res.status(404).json({ message: "File not found" });
        // privacy
        if (fileDoc.privacy === "private" && String(fileDoc.uploaded_by) !== String(req.user.id)) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const fileStream = fs.createReadStream(fileDoc.path);
        fileStream.pipe(res);
    } catch (error) {
        res.status(500).json({ message: "Streaming failed" });
    }
};

// public streaming
exports.publicStreamFile = async (req, res) => {
    try {
        const fileDoc = await File.findById(req.params.id);
        if (!fileDoc || fileDoc.privacy != "public") {
            return res.status(404).json({ message: "File not available publicly" })
        }
        const fileStream =fs.createReadStream(fileDoc.path);
        fileStream.pipe(res);
    } catch (error) {
        res.status(500).json({ message: "Public streaming failed" });
    }

};
exports.searchFiles = (req, res) => res.send("placeholder");
exports.getFileDetails = (req, res) => res.send("placeholder");
exports.filterFiles = (req, res) => res.send("placeholder");