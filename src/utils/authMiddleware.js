const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: missing token!" });
    }
    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
        return res.status(401).json({ message: "Unauthorized: invalid token format!" });
    }

    // Verify the token
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden: invalid token" });
        }
        req.user = user;
        next();
    });
}

module.exports = {
    authenticateToken
}
