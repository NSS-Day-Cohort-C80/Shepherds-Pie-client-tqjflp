import { Routes, Route } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { ApplicationViews } from "./views/ApplicationViews.jsx"
import "./App.css"

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<ApplicationViews />} />
    </Routes>
  )
}

export default App