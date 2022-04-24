const express = require("express")
const router = express()

const { loginUser } = require("../controllers/auth")

router.post("/login", loginUser)

module.exports = router