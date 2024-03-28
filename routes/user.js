const express = require("express")
const { userCreate, userCheck, authenticationUser, passwordUpdate } = require("../controller/user_controller")
const { viewEmail } = require("../midlleware/view")
const userRouter = express.Router()

userRouter.post("/signup", userCreate)
userRouter.post("/login", userCheck)
userRouter.get("/auth", authenticationUser)
userRouter.post("/update-password", viewEmail, passwordUpdate)


module.exports = userRouter
