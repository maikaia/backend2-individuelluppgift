const express = require("express")
const router = express()

const { registerUser } = require("../controllers/users")

router.post("/", registerUser)

module.exports = router