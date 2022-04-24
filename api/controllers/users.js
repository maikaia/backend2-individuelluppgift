const { createToken } = require("./auth")
const { createUser, getUserList } = require("../models/User")

const registerUser = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        res.sendStatus(400).json( {error: "Enter a valid username and password"} )
    } else {
        const checkUserList = (await getUserList()).filter(
            (item) => username === item.username
        )
        if (checkUserList.length > 0) {
            res.status(400).json( {error: "Username already registered"} )
        } else {
            const user = await createUser({ username, password })
            const token = createToken(user)

            res.status(201).json({
                user: {
                    username, 
                    password,
                    token
                }
            })
        }
    }
}

module.exports = { registerUser }