const jwt = require('jsonwebtoken');


let secretKey = process.env.SECRET_KEY
// JWT token yaratish funksiyasi
function generateToken(payload) {
    const token = jwt.sign(payload, secretKey);
    return token;
}

// JWT tokenni tasdiqlash funksiyasi
function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (err) {
        return null; // Token noto'g'ri yoki mudofaa muhlati tugagan
    }
}



module.exports = { generateToken, verifyToken }