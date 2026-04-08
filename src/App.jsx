import { Routes, Route } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { ApplicationViews } from "./views/ApplicationViews.jsx"
// import Order from "./components/Order"
//import Navbar from "./components/nav/Navbar.jsx"
import "./App.css";

function App() {
  return (
    <>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<ApplicationViews />} />
        </Routes>
    </>
  )
}

export default App;
