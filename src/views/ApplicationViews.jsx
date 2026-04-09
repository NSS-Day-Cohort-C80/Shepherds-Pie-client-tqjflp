import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import Navbar from "../components/nav/Navbar.jsx"
import Order from "../components/orders/Order.jsx"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const localShepherdEmployee = localStorage.getItem("shepherd_employee")
    const shepherdEmployeeObject = JSON.parse(localShepherdEmployee)
    setCurrentUser(shepherdEmployeeObject)
  }, [])

  if (!currentUser) return null
  //placeholder divs will need real components, ex
  //<Route path="receipts/id" element={<OrderSummary currentUser={currentUser} />} />, would show full details of clicked order
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
        <Route index element={<div>Home</div>} />
        <Route path="order" element={<Order currentUser={currentUser} />} />
        <Route path="order-summary" element={<OrderSummary currentUser={currentUser} />} />
        <Route path="receipts" element={<div>Receipts</div>} />
      </Route>
    </Routes>
  )
}
