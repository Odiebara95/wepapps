
const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./database")
const Patients = require("./model/patients")
dotenv.config()


const app = express()

app.use(express.json())

connectDB()
Patients()
const PORT = process.env.PORT || 7000

app.listen(PORT, ()=>{
    console.log(`Express Sever running on ${PORT}`)
})

//API's

app.post("/patient", async (req, res)=>{

    try {
        const { firstName, lastName, cardNo, doctorAssigned, nurseAssigned, diagnosis, doctorsReport, nextOfKinName,emergencyContact } = req.body

        const patient = await Patients.findOne({cardNo: cardNo})
    
        if(patient) 
        return res.status(404).json({msg: "Patient already exist!"})
    
        const newPatient = new Patients({ firstName, lastName, cardNo, doctorAssigned, nurseAssigned, diagnosis, doctorsReport, nextOfKinName, emergencyContact })
     
        await newPatient.save() 
    
        return res.status(200).json({msg: "Patient added succefully."})

    }catch (error) {
        return res.status(500).json({msg: error.message})
    }
})

app.get("/patients", async (req, res)=>{

    try {
        const allPatients = await Patients.find()

        if (!allPatients)
            return res.status(404).json({msg: "No patients on the Database."}) 

        res.status(200).json(allPatients)

    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
})

app.get("/patient/:id", async (req, res)=>{

    try {
    //    const {id} = req.params  
       const id = req.params.id // another way to write the previous line
       const patient = await Patients.findById(id)

       if(!patient)
            return res.status(404).json({msg: "This Patient doesn't exist!"})

        return res.status(200).json(patient)

    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
})

app.put("/patient/:id", async (req, res)=>{

    try {
        const {id} = req.params  
    //  const id = req.params.id // another way to write the previous line
        const {firstName, lastName, cardNo, doctorAssigned, nurseAssigned, diagnosis, doctorsReport, nextOfKinName,emergencyContact} = req.body
        const patient = await Patients.findByIdAndUpdate(id, {firstName, lastName, cardNo, doctorAssigned, nurseAssigned, diagnosis, doctorsReport, nextOfKinName,emergencyContact})

        return res.status(200).json({msg: "Patient updated successfully!"})

    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
})

app.delete("/patient/:id", async (req, res)=>{
    try {
     const id = req.params.id
 
     const patientToDelete = await Patients.findById(id)
 
     if(!patientToDelete) 
         return res.status(404).json({msg: "This patient does not exist!"})
 
     const deletedPatient = await Patients.findByIdAndDelete(id) 
 
     return res.status(200).json({message: "Patient deleted successfully!"})
     
    } catch (error) {
     return res.status(500).json({msg: error.message})
    }
 })
 
 app.patch("/patient/:id", async (req, res)=>{
 
     const {firstName, lastName, cardNo, doctorAssigned, nurseAssigned, diagnosis, doctorsReport, nextOfKinName,emergencyContact} = req.body
 
     const id = req.params.id
 
     const nPatient = await Patients.findByIdAndUpdate(id, {firstName, lastName, cardNo, doctorAssigned, nurseAssigned, diagnosis, doctorsReport, nextOfKinName,emergencyContact})
 
     res.json({msg: "patient updated successfully!"})
 })
