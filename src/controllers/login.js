const authService = require("../services/login");

async function login(req, res) {
  try {
    const { name, password } = req.body;
    const { token } = await authService.login(name, password);
    res.json({ name: name, token: token });
  } catch (error) {
    alert("invalid name or password");
    res.status(401).json({ message: "Invalid name or password" });
  }
}

module.exports = {
  login,
};
