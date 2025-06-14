const crypto = require("crypto");

// generate a random secret key
const secretKey = crypto.randomBytes(32).toString("hex");

module.exports = {
  secretKey: secretKey,
};
