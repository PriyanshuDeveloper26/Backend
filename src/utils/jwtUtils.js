const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");

function generateToken(user) {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    }
    return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

module.exports = {
  generateToken,
};
