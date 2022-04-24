const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

userSchema.pre("save", async function (next) {
    if (this.modifiedPaths().includes("password")) {
        const hash = await bcrypt.hash(this.password, 10)
        this.password = hash
    }
    next()
})

userSchema.statics.login = async function (username, password) {
    const user = await User.findOne({ username })
    if (user && await bcrypt.compare(password, user.password)) {
        return user
    } else {
        return null
    }
}

const User = mongoose.model("User", userSchema)

const createUser = async (userData) => {
    const user = new User(userData)
    await user.save()
    return user
}

const verifyUser = async (username, password) => {
    const user = await User.login(username, password)
    return user
}

const getUserList = async () => {
    const userList = await User.find({ password: 0 }).exec()
    return userList
}

module.exports = {
    createUser,
    verifyUser,
    getUserList
}

exports.User = User;