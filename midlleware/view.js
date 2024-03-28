const { verifyToken } = require("../utils/jwt");

const viewEmail = async (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1]

    let tokenVerify = verifyToken(token)
    if (tokenVerify) {
        console.log(tokenVerify.email);
    } else {
        console.log("Invalid token")
    }
    next()

}


module.exports = { viewEmail }