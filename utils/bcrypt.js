const bcrypt = require('bcrypt');

// Parolni hashlash funksiyasi
async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

// Parolni tekshirish funksiyasi
async function checkPassword(plainPassword, hashedPassword) {
    const isCorrect = await bcrypt.compare(plainPassword, hashedPassword);
    return isCorrect;
}



module.exports = { hashPassword, checkPassword }
