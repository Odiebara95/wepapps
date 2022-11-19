const express = require("express")
const dotenv = require("dotenv")
dotenv.config()

const app= express()

app.use(express.json()) // a middle ware

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`server started running on port ${PORT}`)
} )

const community_sec_school = [
    [
        { name: "Paul Odiebara", regNo: "001", gender: "male", dob: "10-06-1997", state: "Delta"},
        { name: "Paulina Balogun", regNo: "002", gender: "female", dob: "24-03-1996", state: "Edo"},
        { name: "Yole Ekeke", regNo: "003", gender: "male", dob: "15-01-1995", state: "Delta"},
        { name: "Fatimat Muhammed", regNo: "004", gender: "female", dob: "03-03-1997", state: "Kogi"},
        { name: "Michael Barisua", regNo: "005", gender: "male", dob: "29-11-1996", state: "Rivers"}
    ],
    [
        { name: "Kingsley Ehimen", regNo: "010", gender: "male", dob: "16-04-1994", state: "Edo"},
        { name: "Chima Amadi", regNo: "011", gender: "male", dob: "01-12-1993", state: "Rivers"},
        { name: "Yvonne Obong", regNo: "012", gender: "fmale", dob: "21-09-1995", state: "Calabar"},
        { name: "Benjamin Okereke", regNo: "013", gender: "male", dob: "07-11-1995", state: "Enugu"},
        { name: "Chilegide Olumati", regNo: "014", gender: "female", dob: "25-05-1994", state: "Rivers"}
    ],
    [
        { name: "Ozioma Nwabueze", regNo: "021", gender: "female", dob: "15-11-1993", state: "Anambra"},
        { name: "George Boma-Smith", regNo: "022", gender: "male", dob: "07-07-1992", state: "Rivers"},
        { name: "Oluwakemi Adebanjo", regNo: "023", gender: "female", dob: "22-10-1994", state: "Ogun"},
        { name: "Oreva Silver", regNo: "024", gender: "female", dob: "31-10-1994", state: "Delta"},
        { name: "Suleiman Abubakar", regNo: "025", gender: "male", dob: "04-02-1992", state: "Adamawa"}
    ]
]

app.get("/school", (req, res) => {

    res.json(community_sec_school)
})

// const sssOne = [
//     { name: "Blessing Nwiyor", regNo: "026", gender: "female", dob: "14-07-1993", state: "Rivers"},
//     { name: "Benjamin Okemena", regNo: "027", gender: "male", dob: "07-12-1993", state: "Delta"},
//     { name: "Isa Abdulahi", regNo: "028", gender: "male", dob: "23-01-1992", state: "Borno"},
//     { name: "Zainab Alabi", regNo: "029", gender: "female", dob: "29-02-1994", state: "Osun"},
//     { name: "Idara Okon", regNo: "030", gender: "female", dob: "06-08-1993", state: "Akwaibom"}
// ]


app.post("/combined", (req, res) =>{

    const sssOne = req.body

    res.json([...community_sec_school, sssOne])
})

