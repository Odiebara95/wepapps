const express = require("express")
const dotenv = require("dotenv")
const routes = require("./routes")
const connectdb = require("./db")
dotenv.config()

const app = express()

const PORT = process.env.PORT || 8000

connectdb()
app.use(express.json())

app.use("/api", routes)

//this is a test route
app.get("/", (req, res) => {
    res.status(200).json({msg: "Welcome to SmartHub Backend.!"})
})
app.listen(PORT, ()=>{
    console.log(`Express Sever running on ${PORT}`)
})

