const express = require("express");
const multer = require("multer");
const Record = require("../models/Record");
const ParsedFile = require("../models/ParsedFiles");
const router = express.Router();

// multer storage
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: function (req, file, cb) {
    const allowedTypes = [
      "application/vnd.ms-excel", // .xls
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only .xls and .xlsx files are allowed!"));
    }
  },
});

// upload file
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const fileName = req.file.originalname.split(".")[0].toLowerCase();
    const existingFile = await Record.findOne({ fileName });
    if (existingFile) {
      return res
        .status(400)
        .json({ message: `${fileName} has already been uploaded` });
    }
    // Save file info to MongoDB
    const newFile = new Record({
      fileName: fileName,
      fileType: req.file.mimetype,
      size: req.file.size,
      uploadDate: req.file.uploadDate,
    });
    try {
      await newFile.save();

      // Save parsed file info to MongoDB
      const parsedFile = new ParsedFile({
        filename: fileName,
        data: req.file.buffer, // Changed from req.file.data to req.file.buffer
        uploadedAt: req.file.uploadDate,
      });
      await parsedFile.save();
      res.json({
        message: `${fileName} uploaded successfully`,
        file: {
          name: req.file.originalname,
          type: req.file.mimetype,
          size: req.file.size,
          uploadDate: req.file.uploadDate,
        },
      });
    } catch (error) {
      console.error("Excel upload error:", error);
      res.status(500).json({ 
        message: "Failed to process file",
        error: error.message
      });
    }
  } catch (error) {
    console.error("Excel upload error", error);
    res.status(500).json({ message: "Failed to process file" });
  }
});

// get all files
router.get("/recentfiles", async (req, res) => {
  try {
    const files = await Record.find().sort({ uploadDate: -1 }).limit(10);
    res.json(files);
  } catch (error) {
    console.error("Excel recent files error", error);
    res.status(500).json({ message: "Failed to process file" });
  }
});

router.get("/list", async (req, res) => {
  try {
    const files = await Record.find().sort({ uploadDate: -1 }).limit(10);
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch file list" });
  }
});


// get all parsed files
router.get("/parsedfiles", async (req, res) => {
  try {
    const files = await ParsedFile.find().sort({ uploadedAt: -1 }).limit(10);
    res.json(files);
  } catch (error) {
    console.error("Excel parsed files error", error);
    res.status(500).json({ message: "Failed to process file" });
  }
});

module.exports = router;
