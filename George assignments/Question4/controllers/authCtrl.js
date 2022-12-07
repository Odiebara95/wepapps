const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Peoples = require("../model/peopleModel")

const auth = {
    create: async(req, res)=> {
        try {
            const { name, email, password, confirmPassword } = req.body

            if(!name || !email || !password || !confirmPassword)
                return res.status(400).json({msg:"Please enter all fields!"})  
                
            if(password !== confirmPassword)
                return res.status(400).json({msg:"Confirm password does not match!"})

            const alreadyExist = await Peoples.findOne({email: email})
            if(alreadyExist) return res.status(400).json({msg:"This user already exist!"})

            const hashedPassword = await bcrypt.hash(password, 12)

            const newUser = new Peoples({name, email, password: hashedPassword})

            await newUser.save()
            
            return res.status(200).json({msg: "Registration Successful!"})

        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body

            if(!email || !password)
            return res.status(400).json({msg:"Please enter email and Password!"}) 

            const hashedPassword = await bcrypt.hash(password, 12)

            const userEmail = await Peoples.findOne({email: email})
            const userPassword = await Peoples.findOne({hashedPassword: password})

            const oldUser = await Peoples.find({"email": email})


            if(userEmail && userPassword) 
            return res.status(200).json({
                msg: "Login Successful!",
                oldUser
            })

        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },

    allUsers: async (req, res) => {
        try {
            const allUsers = await Peoples.find()

        if (!allUsers)
            return res.status(404).json({msg: "No user on the Database."}) 

        res.status(200).json(allUsers)
            
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },

    oneUser: async (req, res) => {
        try {
            const id = req.params.id
            const user = await Peoples.findById(id)

            if(!user)
                return res.status(404).json({msg: "This user doesn't exist!"})

            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },

    updateUser: async (req, res) => {
        
        try {
            const {id} = req.params  
            const { name, email, password, confirmPassword } = req.body

            if(password !== confirmPassword)
                return res.status(400).json({msg:"Confirm password does not match!"})

            const hashedPassword = await bcrypt.hash(password, 12)

            const userUpdate = await Peoples.findByIdAndUpdate(id, {name, email, password: hashedPassword})

            return res.status(200).json({msg: "User updated successfully!"})

        } catch (error) {
            return res.status(500).json({msg: error.message})  
        }
    },

    deleteUser: async (req, res) => {
        try {
            const id = req.params.id

            const userToDelete = await Peoples.findById(id)

            if(!userToDelete) 
                return res.status(404).json({msg: "This user does not exist!"})

            const deletedUser = await Peoples.findByIdAndDelete(id) 

            return res.status(200).json({message: "User deleted successfully!"})
    
        } catch (error) {
            return res.status(500).json({msg: error.message})  
        }

    }

}

module.exports = auth