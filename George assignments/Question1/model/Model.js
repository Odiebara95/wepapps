const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
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
        type: String, 
        required: true
    }
}, {
    timestamps: true
})


const Clients = mongoose.model("Clients", clientSchema)

module.exports = Clients