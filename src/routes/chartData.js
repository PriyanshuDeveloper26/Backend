const express = require("express");
const router = express.Router();
const Chart = require("../models/Chart");
const authMiddleware = require("../utils/authMiddleware");

// Save chart
router.post("/save", authMiddleware.authenticateToken, async (req, res) => {
  try {
    const { chartName, chartType, xAxis, yAxis, user, fileName } = req.body;
    const chart = new Chart({ chartName, chartType, xAxis, yAxis, user, fileName });
    await chart.save();
    res.status(201).json({ message: "Chart saved", chart });
  } catch (error) {
    console.error("Error saving chart:", error);
    res.status(500).json({ message: "Failed to save chart" });
  }
});

// Get chart count
router.get("/count", authMiddleware.authenticateToken, async (req, res) => {
  try {
    const count = await Chart.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chart count" });
  }
});

module.exports = router;
