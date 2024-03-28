// Requirement library start

const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const userRouter = require("./routes/user")
const mongoose = require('mongoose');

//Requirement ended 

// Security and Json
app.use(cors())
app.use(bodyParser())
// Security and Json



// Database Connection

const MONGODB_OFFLINE = process.env.MONGODB_OFFLINE;
console.log(MONGODB_OFFLINE);
mongoose.connect(MONGODB_OFFLINE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


app.use("/user", userRouter)


let PORT = process.env.PORT


app.listen(PORT, () => {

    console.log(`Server is running http://localhost:${PORT}`);
})



