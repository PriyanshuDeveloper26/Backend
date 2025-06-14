const mongoose = require("mongoose");
const { Schema } = mongoose;

const chartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fileId: {
        type: Schema.Types.ObjectId,
        ref: "Record",
        required: true
    },
    chartName: {
        type: String,
        required: true
    },
    chartType: {
        type: String,
        enum: ["bar","line","pie","scatter","column3d"],
        required: true
    },
    xAxis: {
        type: String,
        required: true
    },
    yAxis: {
        type: String,
        required: true
    },
    chartData: {
        type: Schema.Types.Mixed,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now,
    }
});

const Chart = mongoose.model("Chart", chartSchema)

module.exports = Chart;