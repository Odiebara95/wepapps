const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()


const URL = `${process.env.MONGODB_URL}`


const connectDb = async () => {
    await mongoose.connect(URL, (err) => {
        // if (err) throw err
        console.log("MongoDB connected")
    })
}

module.exports = connectDb