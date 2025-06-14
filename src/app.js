const express = require("express");
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const userRoute = require("./routes/user");
const bodyParser = require("body-parser");
const cors = require("cors");
const createAdminAccount = require("./scripts/admin");
const app = express();
const PORT = process.env.PORT || 5000;
const fileRoute = require("./routes/fileroutes");
const chartDataRoute = require("./routes/chartData");



app.use(bodyParser.json());
app.use(cors());

createAdminAccount();

app.use("/user", signupRoute);
app.use("/auth", loginRoute);
app.use("/api", userRoute);
app.use("/file", fileRoute);
app.use("/chart", chartDataRoute);

// Connect Server
app.listen(PORT, () => {
  console.log(`Server started on: http://localhost: ${PORT}`);
});