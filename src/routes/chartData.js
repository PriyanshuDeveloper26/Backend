const express = require("express");
const router = express.Router();
const Chart = require("../models/Chart");
const Record = require("../models/Record");

const createChart = async (req, res) => {
  try {
    const { fileId, chartName, chartType, xAxis, yAxis, chartData } = req.body;

    //validate input
    if (!fileId || !chartName || !chartType || !xAxis || !yAxis) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //Get file data
    const file = await Record.findOne({ _id: fileId, userId: req.user.id });
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    //validate axis exist in data
    if (!file.columns.includes(xAxis) || !file.columns.includes(yAxis)) {
      return res.status(400).json({ message: "Invalid axis selected" });
    }

    //create chart
    const chart = new Chart({
      userId: req.user.id,
      fileId,
      chartName,
      chartType,
      xAxis,
      yAxis,
      chartData,
    });
    await chart.save();
    res.status(201).json({
      message: "Chart created successfully",
      chart: {
        _id: chart._id,
        chartName: chart.chartName,
        chartType: chart.chartType,
        xAxis: chart.xAxis,
        yAxis: chart.yAxis,
        chartData: chart.chartData,
        createdDate: chart.createdDate,
      },
    });
  } catch (error) {
    console.error("Chart creation error:", error);
    res
      .status(500)
      .json({ message: "Failed to create chart", error: error.message });
  }
};

//Get user's charts
const getUserCharts = async (req, res) => {
  try {
    const charts = await Chart.find({ userId: req.user.id })
      .populate("fileId", "originalFileName")
      .sort({ createdDate: -1 });
    res.json(charts);
  } catch (error) {
    console.error("Chart fetch error:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch charts", error: error.message });
  }
};

//Get a specific chart
const getChart = async (req, res) => {
  try {
    const { chartId } = req.params;
    const chart = await Chart.findOne({
      _id: req.params.chartId,
      userId: req.user.id,
    }).populate("fileId", "originalFileName");
    if (!chart) {
      return res.status(404).json({ message: "Chart not found" });
    }
    res.json(chart);
  } catch (error) {
    console.error("Chart fetch error:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch chart", error: error.message });
  }
};

//Helper function to process chart data
const processChartData = (data, xAxis, yAxis, chartType) => {
  const labels = [];
  const values = [];

  if (chartType === "pie") {
    const aggregated = {};
    data.forEach((row) => {
      const xValue = row[xAxis];
      const yValue = row[yAxis];
      aggregated[xValue] = (aggregated[xValue] || 0) + yValue;
    });
    Object.entries(aggregated).forEach(([key, value]) => {
      labels.push(key);
      values.push(value);
    });
  } else {
    data.forEach((row) => {
      labels.push(row[xAxis]);
      values.push(parseFloat(row[yAxis]) || 0);
    });
  }
  return {
    labels: labels.slice(0, 50),
    datasets: [
      {
        label: yAxis,
        data: values.slice(0, 50),
        backgroundColor: generateColors(Math.min(labels.length, 50)),
        borderColor: "#5b6e74",
        borderWidth: 2,
      },
    ],
  };
};

//Helper function to generate colors
const generateColors = (count) => {
  const colors = [
    "#5b6e74",
    "#819fa7",
    "#bde8f1",
    "#f2f2f0",
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#FF6384",
    "#C9CBCF"
  ];
  return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
};

// Define routes
router.post("/create", createChart);
router.get("/user/:userId", getUserCharts);
router.get("/:chartId", getChart);
router.post("/process", (req, res) => {
  const { data, xAxis, yAxis, chartType } = req.body;
  const chartData = processChartData(data, xAxis, yAxis, chartType);
  res.json(chartData);
});

module.exports = router;