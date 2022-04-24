const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const userRouter = require("./routes/users")
const authRouter = require("./routes/auth")

const { findOldToken } = require("./models/OldToken")

const Todo = require("./models/Todo")

const { requireLogin } = require("./controllers/auth")

const app = express()
const PORT = process.env.PORT
const MONGODB_URL = process.env.MONGODB_URL

app.use(express.json())
app.use(cors())

app.use( async (req, res, next) => {
    const authHeader = req.header("Authorization")
    const SECRET = process.env.JWT_SECRET
  
    if (authHeader) {
      const token = authHeader.split(" ")[1]
      if (await findOldToken(token)) {
        res.status(401).json({ error: "Token invalid, log in again" })
      } else {
        req.user = jwt.verify(token, SECRET)
      }
    }
    next()
})

app.use("/auth", authRouter)
app.use("/users", userRouter)

app.get("/todos", requireLogin, async (req, res) => {
    const userId = req.user.userId
    const todos = await Todo.find({author: mongoose.Types.ObjectId(userId)}).sort({createdAt: -1})
    res.json(todos)
})

app.post("/todo/new", requireLogin, (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        author: req.user.userId
    })
    todo.save()
    res.json(todo)
})

app.get("/todo/complete/:id", requireLogin, async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    todo.complete = !todo.complete
    todo.save()
    res.json(todo)
})

mongoose.connect(MONGODB_URL)
app.listen(PORT, () => {
    console.log(`Started Express server on port ${PORT}`);
});