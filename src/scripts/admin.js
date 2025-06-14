const User = require("../models/User");
const bcrypt = require("bcrypt");

// Create Admin Account
async function createAdminAccount() {
  try {
    const existingAdmin = await User.findOne({ email: "zidiodev@gmail.com" });
    if (!existingAdmin) {
      const newAdmin = new User({
        name: "Admin",
        email: "zidiodev@gmail.com",
        password: await bcrypt.hash("admin@123", 10),
        role: "admin",
      });
      await newAdmin.save();
      console.log("Admin account created successfully");
    } else {
      console.log("Admin already exist");
    }
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = createAdminAccount;
