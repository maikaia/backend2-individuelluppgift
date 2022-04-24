import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CredentialsContext } from "../App";

const API_BASE = "http://localhost:3001/users"

export default function RegisterPage() {
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [, setCredentials] = useContext(CredentialsContext);
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()
        const payload = { username, password }

        fetch(API_BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
        .then(() => {setCredentials(payload)})
        .then(res => res.json())
        navigate("/auth/login")
    }

    return (
        <>
            <h1>Create a new account</h1>

            <div className="form">
                <form onSubmit={onSubmit}>
                    <input
                    type="text"
                    value={username} 
                    placeholder="Username"
                    onChange={e => setUsername(e.target.value)}
                    />
                    <input
                     type="password" 
                     value={password} 
                     placeholder="Password"
                     onChange={e => setPassword(e.target.value)}
                    />
                    <input type="submit" value="Create account" />
                </form>
            </div>
        </>
    )
}