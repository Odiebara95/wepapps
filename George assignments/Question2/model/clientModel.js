const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter your first name!"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name!"],
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
    },
    address: {
        type: String
    }

}, {
    timestamps: true
})


const Clients = mongoose.model("Clients", clientSchema)

module.exports = Clients