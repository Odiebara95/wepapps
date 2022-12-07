
const express = require("express")
const auth = require("../controllers/authCtrl")

const router = express.Router()

router.post("/register", auth.register)

router.post("/login", auth.login)

// router.get("/users", auth.getAll)


module.exports = router