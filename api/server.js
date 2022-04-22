const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
const PORT = 3001

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost/todo")

const Todo = require("./models/Todo")

app.get("/todos", async (req, res) => {
    const todos = await Todo.find()
    res.json(todos)
})

app.post("/todo/new", (req, res) => {
    const todo = new Todo({
        text: req.body.text
    })
    todo.save()
    res.json(todo)
})

app.get("/todo/complete/:id", async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    todo.complete = !todo.complete
    todo.save()
    res.json(todo)
})

app.listen(PORT, () => {
    console.log(`Started Express server on port ${PORT}`);
  });
