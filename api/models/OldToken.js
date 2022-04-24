const mongoose = require("mongoose")

const OldTokenSchema = new mongoose.Schema({
    token: { type: String, required: true }
})

const OldToken = mongoose.model("OldToken", OldTokenSchema)

const saveOldToken = async (token) => {
    const oldToken = new OldToken({ token })
    await oldToken.save()
}

const findOldToken = async (token) => {
    return await OldToken.findOne({ token })
}

module.exports = { saveOldToken, findOldToken }