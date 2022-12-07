const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your first name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter email!"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: { 
        type: String
    }

}, {
    timestamps: true
})


const Peoples = mongoose.model("Peoples", peopleSchema)

module.exports = Peoples