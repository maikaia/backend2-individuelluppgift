const jwt = require("jsonwebtoken")
const { verifyUser } = require("../models/User")
const { saveOldToken } = require("../models/OldToken")

const requireLogin = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.status(401).json( {error: "Unauthorized"} )
    }
}

const createToken = ({ _id, username }) => {
    const SECRET = process.env.JWT_SECRET
    const userId = _id.toString()
    const token = jwt.sign({ userId, username }, SECRET, {
        expiresIn: "1h",
        subject: userId
    })
    return token
}

const loginUser = async (req, res) => {
    const { username, password } = req.body
    console.log(req.body)
    const user = await verifyUser(username, password)
    const token = createToken(user)
    if (user) {
        res.status(200).json({
            user: {
                username,
                password,
                token
            }
        })
    } else if (!user) {
        res.status(400).json({error: "User not found, create an account or try again"})
    } else {
        res.status(500).json({error: "Serverfel"})
    }
}

const logoutUser = async (req, res) => {
    const authHeader = req.header("Authorization")
    const token = authHeader.split(" ")[1]
    await saveOldToken(token)
    res.json({ message: "User logged out" })
}

module.exports = { requireLogin, createToken, loginUser, logoutUser }