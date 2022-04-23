import {useState, useEffect } from "react"

const API_BASE = "http://localhost:3001"

function App() {
  const [todos, setTodos] = useState([]);
  
  useEffect (() => {
    GetTodos ();
  }, [])

  const GetTodos = () => {
    fetch(API_BASE + "/todos")
      .then (res => res.json())
      .then (data => setTodos(data))
      .catch(err => console.error ("Error: ", err));
  }
  
  const completeTodo = async id => {
      const data = await fetch(API_BASE + '/todo/complete/' + id)
      .then(res => res.json());
  
        setTodos(todos => todos.map(todo => {
            if (todo._id === data._id) {
              todo.complete = data.complete;
            }
      
            return todo;
      }))
  }

  return (
    <div className="App">
     <h1>Welcome</h1>
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
    </div>

  );
}

export default App;
