import { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Login } from "./components/auth/Login";
import Order from "./components/orders/Order";
import OrderSummary from "./components/orders/OrderSummary.jsx";
import Navbar from "./components/nav/Navbar.jsx";
//import { ApplicationViews } from "./views/ApplicationViews.jsx";
import "./App.css";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const localShepherdEmployee = localStorage.getItem("shepherd_employee")
    const shepherdEmployeeObject = JSON.parse(localShepherdEmployee)
    setCurrentUser(shepherdEmployeeObject)
  }, [])

  if (!currentUser) return null
  const Receipts = () => <div>Receipts Page</div>;

  return (
    <>
      <div className="App"></div>
        <Navbar currentUser={currentUser} />
        <Outlet />
        <Routes>
          <Route path="/*" element={<Login />} />
          <Route path="/Order" element={<Order currentUser={currentUser} />} />
          <Route path="/OrderSummary" element={<OrderSummary currentUser={currentUser} />} />
        </Routes>
    </>
  )
}

export default App
