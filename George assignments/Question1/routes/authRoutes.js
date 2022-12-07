
const express = require("express")
const auth = require("../controllers/authCtrl")

const router = express.Router()

router.post("/register", auth.register)

module.exports = router