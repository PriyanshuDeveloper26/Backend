const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken } = require("../utils/jwtUtils");

async function login(name, password, res) {
  try {
    const existingUser = await User.findOne({ name });
    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
    }
    const token = generateToken(existingUser);
    return { token };
  } catch (error) {
    console.log("login error", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  login,
};
