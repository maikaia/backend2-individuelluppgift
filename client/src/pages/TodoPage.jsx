import React, {useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'

const API_BASE = "http://localhost:3001"

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false)
  const [newTodo, setNewTodo] = useState("")
  const navigate = useNavigate()
  
  useEffect (() => {
    GetTodos ()
  }, [])

  const GetTodos = () => {
    const token = localStorage.getItem("todotodo")
    fetch(API_BASE + "/todos", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
      .then (res => res.json())
      .then (data => setTodos(data))
  }
  
  const completeTodo = async id => {
    const token = localStorage.getItem("todotodo")
      const data = await fetch(API_BASE + '/todo/complete/' + id, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
      })
      .then(res => res.json());
  
        setTodos(todos => todos.map(todo => {
            if (todo._id === data._id) {
              todo.complete = data.complete;
            }
            return todo;
      }))
  }

  const addTodo = async () => {
    const token = localStorage.getItem("todotodo")
    const data = await fetch(API_BASE + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        text: newTodo
      })
    }).then(res => res.json())
    GetTodos()
    setTodos([...todos, data])
    setPopupActive(false)
    setNewTodo("")
  }

  const logout = () => {
    localStorage.clear()
    navigate("/")
  };

  return (
    <div className="App">
      <button className="button logout" onClick={logout}>Logout</button>
     <h1>Welcome </h1>
     <h4>Your Tasks</h4>

     <div className="todos">
     {todos.filter((item) => !item.complete).map(todo => (
        <div className="todo" key={ todo._id } onClick={() => completeTodo(todo._id)}>
          <div className="checkbox" ></div>

          <div className="text">{ todo.text }</div>
        </div>
       ))}

       <h4>Completed tasks</h4>

       {todos.filter((item) => item.complete).map(todo => (
        <div className="todo is-complete" key={ todo._id } onClick={() => completeTodo(todo._id)}>
          <div className="checkbox" ></div>

          <div className="text">{ todo.text }</div>
        </div>
       ))}
     </div>
     <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

     {popupActive ? (
       <div className="popup">
         <div className="closePopup" onClick={() => setPopupActive(false)}>x</div>
         <div className="content">
           <h3>Add Task</h3>
           <input 
              type="text" 
              className="add-todo-input" 
              onChange={e => setNewTodo(e.target.value)} 
              value={newTodo} />
              <div className="button" onClick={addTodo}>Create task</div>
         </div>
       </div>
     ) : ""}
    </div>
  );
}