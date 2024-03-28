const User = require("../models/user_model")
const { hashPassword, checkPassword } = require("../utils/bcrypt")
const { generateToken, verifyToken } = require("../utils/jwt")

const userCreate = async (req, res) => {
    let { email, password, role } = req.body
    let hashedPassword = await hashPassword(password)
    let user = await User.create({ email, password: hashedPassword, role })

    user.save().then(createResponse => {
        res.status(201).send({ msg: "success", detail: createResponse.email })
    }).catch(err => {
        if (err) {
            res.status(301).send("Server Error")
        }
    })

}



const userCheck = async (req, res) => {
    let { email, password } = req.body
    let user = await User.findOne({ email })
    let userPassword = user.password
    let checkingPassword = await checkPassword(password, userPassword)
    console.log(checkingPassword)

    if (checkingPassword) {
        let token = generateToken(JSON.stringify(user))
        console.log(token);
        res.status(201).send({ token })
    } else {
        res.status(404).send("Password incorrect")

    }
}


const authenticationUser = async (req, res) => {
    let token = req.headers.authorization.split(" ")[1]
    console.log(req.headers.authorization.split(" "))
    if (token) {
        let verifyTokenBase = verifyToken(token)
        let existingUser = await User.findOne({ email: verifyTokenBase.email })
        if (existingUser && verifyTokenBase.password === existingUser.password) {
            res.status(201).send({ email: verifyTokenBase.email })
            return
        }
        res.status(400).send({ msg: "Please re-login" })
        return
    }
    res.status(401).send("Unauthorized")
}



const passwordUpdate = async (req, res) => {
    let token = req.headers.authorization.split(" ")[1]
    let password = req.body.password
    if (token) {
        let verifyTokenBase = verifyToken(token)
        let hashedPassword = await hashPassword(password)

        let existingUser = await User.findOneAndUpdate({ email: verifyTokenBase.email }, { password: hashedPassword }, { new: true })
        if (existingUser) {
            let tokenResponse = generateToken(JSON.stringify(existingUser))
            res.status(201).send({ token: tokenResponse })
            return
        }
        res.status(400).send({ msg: "Please re-login" })
        return
    }
    res.status(401).send("Unauthorized")
}


module.exports = { userCreate, userCheck, authenticationUser, passwordUpdate }