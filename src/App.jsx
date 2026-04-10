import { Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { Login } from "./components/auth/Login"
import { ApplicationViews } from "./views/ApplicationViews.jsx"
import "./App.css"

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const localShepherdEmployee = localStorage.getItem("shepherd_employee")
    const shepherdEmployeeObject = JSON.parse(localShepherdEmployee)
    setCurrentUser(shepherdEmployeeObject)
  }, [])

  if(currentUser === undefined) {
    return null
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
      <Route path="/*" element={
        currentUser ? <ApplicationViews currentUser={currentUser} /> : <Navigate to="/login" />
      } />
    </Routes>
  )
}

export default App