const User = require("../models/User");
const bcrypt = require("bcrypt");

async function createUser(userData) {
  const { name, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const createUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "user",
  });
  const savedUser = await createUser.save();
  return savedUser;
}

module.exports = { createUser };
