import { useEffect, useState } from "react"
import { Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Navbar from "../components/nav/Navbar.jsx"
import Order from "../components/orders/Order.jsx"
import OrderSummary from "../components/orders/OrderSummary.jsx"
import Receipts from "../components/receipt/Receipts.jsx"
import { Login } from "../components/auth/Login.jsx"

export const ApplicationViews = ({ currentUser }) => {
  const location = useLocation()
  const navigate = useNavigate()

  /* useEffect(() => {
    const localShepherdEmployee = localStorage.getItem("shepherd_employee")
    const shepherdEmployeeObject = JSON.parse(localShepherdEmployee)
    setCurrentUser(shepherdEmployeeObject)
  }, [location]) 

  if (!currentUser) {
    navigate("/Login")
  } */


// useEffect (() => {
//   if (!currentUser) {navigate("/Login")}}, [])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar currentUser={currentUser} />
            <Outlet />
          </>
        }
      >
        <Route path="order" element={<Order currentUser={currentUser} />} />
        <Route path="orderSummary" element={<OrderSummary currentUser={currentUser} />} />
        <Route path="receipts" element={<Receipts currentUser={currentUser} />} />
      </Route>
    </Routes>
  )
}