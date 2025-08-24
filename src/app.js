const express = require("express");
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const userRoute = require("./routes/user");
const bodyParser = require("body-parser");
const cors = require("cors");
const createAdminAccount = require("./scripts/admin");
const app = express();
const PORT = process.env.PORT || 5000;
const fileRoute = require("./routes/fileRoutes");
const chartDataRoute = require("./routes/chartData");
const User = require("./models/User");
const authMiddleware = require("./utils/authMiddleware");
const dns = require('dns');
app.use(bodyParser.json());
app.use(cors());

createAdminAccount();

app.get('/me', authMiddleware.authenticateToken, async (req, res) => {
    try {
      const user = await User.findById(req.userId).select('-password');
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });

dns.lookup('localhost', (err) => {
  if (err && err.code === "ENOTFOUND") {
    console.log("❌ No internet connection");
    process.exit(1);
  } else {
    console.log("✅ Internet is connected");
  }
});


app.use("/user", signupRoute);
app.use("/auth", loginRoute);
app.use("/api", userRoute);
app.use("/file", fileRoute);
app.use("/chart", chartDataRoute);

// Connect Server
app.listen(PORT, () => {
  console.log(`Server started on: http://localhost: ${PORT}`);
});