
const express = require("express")
const auth = require("../controllers/authCtrl")

const router = express.Router()

router.post("/create", auth.create)

router.post("/login", auth.login)

router.get("/users", auth.allUsers)

router.get("/user/:id", auth.oneUser)

router.put("updateUser/:id", auth.updateUser)

router.delete("deleteUser/:id", auth.deleteUser)


module.exports = router