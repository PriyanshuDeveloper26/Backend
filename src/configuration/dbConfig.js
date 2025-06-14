const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://sathavarapriyanshu9:sathavarapriyanshu9@cluster0.sufnxqy.mongodb.net/excel_analytics_platform?retryWrites=true&w=majority&appName=Cluster0";

// for atlas
// mongoose.connect(
// "mongodb+srv://sathavarapriyanshu9:sathavarapriyanshu9@cluster0.sufnxqy.mongodb.net/excel_analytics_platform?retryWrites=true&w=majority&appName=Cluster0"
// );

// for mongodb compass
// mongoose.connect(
//   "mongodb://localhost:27017/excel_analytics_platform"
// );

// mongoose.connection.on("connected", () => {
//   console.log("MongoDB connected");
// });

// mongoose.connection.on("error", (err) => {
//   console.log("MongoDB connection error:", `${err}`);
// });

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

module.exports = mongoose;