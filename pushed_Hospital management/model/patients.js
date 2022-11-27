const mongoose = require("mongoose")

const patientSchema = new mongoose.Schema({
    firstName:{
        type: String,
        unique: true,
        trim: true, // removes all the spaces before and after your typing letters
        required: [true, "please add your first name."],
        maxLength: [20, "Your first name cannot be longer than 20 characters"]
    },
    lastName:{
        type: String,
        unique: true,
        trim: true, // removes all the spaces before and after your typing letters
        required: [true, "please add your last name."],
        maxLength: [20, "Your last name cannot be longer than 20 characters"]
    },
    cardNo:{
        type: Number,
        unique: true,
        required: [true, "please add your card Number."],
    },
    doctorAssigned:{
        type: String,
        trim: true,
        required: [true, "please add doctor's name."],
        maxLength: [25, "Doctor's name cannot be longer than 25 characters"]
    },
    nurseAssigned:{
        type: String,
        trim: true,
        required: [true, "please add nurse' name."],
        maxLength: [25, "Nurse name cannot be longer than 25 characters"]
    },
    diagnosis:{
        type: String,
        trim: true,
        required: [true, "please add medical diagnosis."]
    },
    doctorsReport:{
        type: String,
        trim: true,
        required: [true, "please add doctor's report."]
    },
    nextOfKinName:{
        type: String,
        unique: true,
        trim: true,
        required: [true, "please add next of kin's name."],
        maxLength: [30, "Next of Kin's name cannot be longer than 25 characters"]
    },
    emergencyContact:{
        type: Number,
        unique: true,
        required: [true, "please add emergency contact's phone Number."]
    }
}, {timestamps: true})

const Patients = mongoose.model("Patients", patientSchema)

module.exports = Patients