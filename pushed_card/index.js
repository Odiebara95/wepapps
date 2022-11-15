const express = require("express");
const ejs = require("ejs");

const webapp = express();

webapp.use(express.static("public"));
webapp.set("view engine", "ejs");

//API for get request on the home page
webapp.get("/", (req, res) => {

    const students = [
        {FirstName: "Paul", LastName: "Odiebara", Score: 70, State: "Delta", Nationality: "Nigerian"},
        {FirstName: "Miriam", LastName: "Dangote", Score: 60, State: "Osun", Nationality: "Nigerian"},
        {FirstName: "Dappa", LastName: "Precious", Score: 100, State: "Rivers", Nationality: "Nigerian"},
        {FirstName: "Michael", LastName: "Madu", Score: 50, State: "Rivers", Nationality: "Nigerian"},
        {FirstName: "Temitope", LastName: "Asimiyu", Score: 80, State: "Ogun", Nationality: "Nigerian"}
    ]

    res.render("index", {students})
})

webapp.listen(7000, () =>{
    console.log("Server started listening...")
})