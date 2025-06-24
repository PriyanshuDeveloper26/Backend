const mongoose = require("mongoose");

const parsedFileSchema = new mongoose.Schema({
  filename: String,
  data: [Object], // Parsed Excel rows
  uploadedAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("ParsedFile", parsedFileSchema);