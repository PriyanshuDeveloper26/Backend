const mongoose = require("mongoose");

const ChartSchema = new mongoose.Schema({
  chartName: { type: String, required: true },
  chartType: { type: String, required: true },
  xAxis: { type: String, required: true },
  yAxis: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional
  fileName: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Chart", ChartSchema);