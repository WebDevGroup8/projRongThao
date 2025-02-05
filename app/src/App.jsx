import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { LoginPage } from "./pages/Login";
import { HomePage } from "./pages/HomePage";
import { DashBoard } from "./pages/DashBoard";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <LoginPage />
        }
      />

      <Route
        path="/customer/homepage"
        element={
          <HomePage />
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <DashBoard />
        }
      />


    </Routes>
  )
}

export default App
