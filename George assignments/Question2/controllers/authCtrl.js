const Users = require("../model/authModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Clients = require("../model/clientModel")

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN, {expiresIn: "5m"})
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN, {expiresIn: "5d"})
}

const auth = {
    register: async(req, res)=> {
        try {
            const { firstName, lastName, email, password, confirmPassword, address } = req.body

            if(!firstName || !lastName || !email || !password || !confirmPassword || !address)
                return res.status(400).json({msg:"Please enter all fields!"})  
                
            if(password !== confirmPassword)
                return res.status(400).json({msg:"Confirm password does not match!"})

            const alreadyExist = await Clients.findOne({email: email})
            if(alreadyExist) return res.status(400).json({msg:"This user already exist!"})

            const hashedPassword = await bcrypt.hash(password, 12)

            const newUser = new Clients({firstName, lastName, email, password: hashedPassword, address})

            await newUser.save()
            
            return res.status(200).json({
                msg: "Registration Successful!",
                newUser
            })

            
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

            const userEmail = await Clients.findOne({email: email})
            const userPassword = await Clients.findOne({hashedPassword: password})

            const oldUser = await Clients.find({"email": email})


            if(userEmail && userPassword) 
            return res.status(200).json({
                msg: "Login Successful!",
                oldUser
            })

        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    }

    // getAll: async (req, res) => {
    //     try {
    //         const allClients = await Clients.find()

    //     if (!allClients)
    //         return res.status(404).json({msg: "No client on the Database."}) 

    //     res.status(200).json(allClients)
            
    //     } catch (error) {
    //         return res.status(500).json({msg: error.message})
    //     }
    // }

}

module.exports = auth