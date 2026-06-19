const key = require('../config/config.js');
const jwt = require('jsonwebtoken');


const verificarToken = (req, res, next) => {
    const secretKey = key.apiSecret;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Token não fornecido" });

    try {
        const decoded = jwt.verify(token, secretKey);
        req.userId = decoded.uuid;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};

module.exports = verificarToken;