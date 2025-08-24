const mongoose = require("../configuration/dbConfig");

const RecordSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  size: {
    type: Number, // in bytes
    required: true,
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId, // Optional
  //   ref: "User",
  // },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  // uploadedBy: {
  //   ref: "User",
  //   type: mongoose.Schema.Types.ObjectId,
  // }
});

module.exports = mongoose.model("Record", RecordSchema);
