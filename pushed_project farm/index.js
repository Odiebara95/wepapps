const express = require("express");

const webapp = express();

webapp.use(express.static("public"));

//API for get request on the home page
webapp.get("/", (req, res) => {
    // res.send("hello")
    // res.send("<h1>Welcome to Backend</h>")

    res.sendFile("./index.html",{root:__dirname})
})

webapp.get("/contact", (req, res)=>{

    res.sendFile("./pages/contact.html", {root:__dirname})
})
webapp.get("/about", (req, res)=>{

    res.sendFile("./pages/about.html", {root:__dirname})
})
webapp.get("/services", (req, res)=>{

    res.sendFile("./pages/services.html", {root:__dirname})
})




webapp.listen(8000, () =>{
    console.log("Server started listening...")
})