const jwt = require('jsonwebtoken');
const secretKey = "dLa23qou*&eqk23";

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token || token == null || token == undefined) {
        return res.status(403).json({ message: "Token not provided" });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
        return res.status(401).json({ message: "Failed to authenticate token" });
        }
        req.user = decoded;
        next();
    });
}

// Middleware to check role
function checkRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
        return res.status(403).json({ message: "Insufficient permissions" });
        }
        next();
    };
}

module.exports={
    verifyToken,
    checkRole
}