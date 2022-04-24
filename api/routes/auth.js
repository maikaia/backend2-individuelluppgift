const express = require("express")
const router = express()

const { loginUser, logoutUser } = require("../controllers/auth")

router.post("/login", loginUser)
router.post("/logout", logoutUser)

module.exports = router