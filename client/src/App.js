import React, {useState} from "react"
import { Route, Routes, Navigate } from "react-router-dom"

import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import TodoPage from "./pages/TodoPage"

export default function App() {
  return (
      <Routes>
        <Route path="/" element={ <Navigate to="/auth/login" /> } /> 
        <Route path="/auth/login" element={ <LoginPage /> } />
        <Route path="/users" element={ <RegisterPage /> } />
        <Route path="/todos" element={ <TodoPage /> } />
      </Routes>
  )
}