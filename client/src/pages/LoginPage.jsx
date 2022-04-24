import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CredentialsContext } from "../App";

const API_BASE = "http://localhost:3001/auth/login"

export default function LoginPage() {
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [, setCredentials] = useContext(CredentialsContext)
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()
        const payload = { username, password }

        await fetch(API_BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
        .then(res => res.json())
        .then(data => {
            const token = data.user.token
            console.log("DATA: ", data.user.username)
            //console.log("TOKEN: ", token)
            localStorage.setItem("todotodo", token)
        })
        .then(() => {setCredentials(payload)})
        navigate("/todos")
    }
    return (
        <div className="app">
        
            <h1>Log in</h1>

            <div className="form">
                <form onSubmit={onSubmit}>
                    <h4>Username:</h4> <input className="add-todo-input"
                    type="text"
                    name="username" 
                    id="username"
                    value={username} 
                    placeholder="Username"
                    onChange={e => setUsername(e.target.value)}
                    />
                    <h4>Password:</h4> <input className="add-todo-input"
                     type="password" 
                     name="password" 
                     id="password"
                     value={password} 
                     placeholder="Password"
                     onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}