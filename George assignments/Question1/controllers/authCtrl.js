const Users = require("../model/authModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN, {expiresIn: "5m"})
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN, {expiresIn: "5d"})
}

const auth = {
    register: async(req, res)=> {
        try {
            const { email, password, confirmPassword } = req.body

            if(!email || !password || !confirmPassword)
                return res.status(400).json({msg:"Please enter all fields!"})  
                
            if(password !== confirmPassword)
                return res.status(400).json({msg:"Confirm password does not match!"})

            const alreadyExist = await Users.findOne({email: email})
            if(alreadyExist) return res.status(400).json({msg:"This user already exist!"})

            const hashedPassword = await bcrypt.hash(password, 12)

            const newUser = new Users({ email, password: hashedPassword})

            const accessToken = generateAccessToken({newUser})
            const refreshToken = generateRefreshToken({newUser})
            await newUser.save()
            console.log(accessToken)
            
            return res.status(201).json({
                msg: "Account created!",
                newUser,
                accessToken,
                refreshToken
            })

            
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    }
}

module.exports = auth