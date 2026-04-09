import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../nav/Navbar";
import { createOrder, createPizza } from "../../services/orderService";
import { getEmployees } from "../../services/employeeService";
import "./Order.css"


const OrderSummary = ({ currentUser }) => {
    const navigate = useNavigate()
    const [cart, setCart] = useState([])
    const [employees, setEmployees] = useState([])
    const [driverId, setDriverId] = useState(null)
    const [isDelivery, setIsDelivery] = useState(false)



    useEffect(() => {
        const saveCart = JSON.parse(localStorage.getItem("cart")) || []
        setCart(saveCart)

        getEmployees().then(setEmployees)
    }, [])


    const calcTotal = () => {
        let total = cart.reduce((sum, pizza) => sum + pizza.price, 0)
        if (isDelivery) {
            total += 5
        }

        return total.toFixed(2)
    }

    const calcTip = () => {
        return (parseFloat(calcTotal()) * 0.25).toFixed(2)
    }

    const handleSubmitOrder = () => {
        
        if (isDelivery && !driverId) {
            alert("Please select driver for delivery order!!!!!!!!!!!!")
            return
        }


            const newOrder = {
                employeeId: currentUser.id,
                delivererId: isDelivery ? driverId: null,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                tip: calcTip(),
                tableId: null
            }
            createOrder(newOrder).then((createdOrder)=> {
                console.log("created order:", createdOrder)
                cart.forEach((pizza) => {
                    createPizza({ ...pizza, orderId: createdOrder.id })
                })
                localStorage.removeItem("cart");
                navigate("/order")
            })
        } 

    return (

    <div className="summary-container">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-cart">
                {cart.map((pizza) => (
                    <div key={pizza.id}  className="summary-pizza-card">
                        <span className="summary-pizza-size">
                            {pizza.size}
                        </span>
                        <span>Cheese: {pizza.cheese}</span>
                        <span>Sauce: {pizza.sauce}</span>
                        <span>Toppings: {pizza.toppings.length > 0 ? pizza.toppings.join(", ") : "None"}</span>
                    
                        <span className="summary-pizza-price">${pizza.price}</span>
                    </div>
                ))}
        </div>

            <div className="summary-delivery">
                <label>
                    <input
                    type="checkbox"
                    checked={isDelivery}
                    onChange={(event) => {
                        setIsDelivery(event.target.checked)
                        setDriverId(null)
                    }}
                    />
                    Delivery?
                </label>
                <div>
                    {isDelivery ? (
                        <select 
                        value={driverId || ""}
                        onChange={(event) => setDriverId(Number(event.target.value))}
                        className="summary-driver-select">
                            <option value="">Select a driver</option>
                            {employees.map((employee) => (
                                <option key={employee.id} 
                                value={employee.id}>
                                {employee.fullName}
                                </option>
                            ))}
                            </select>
                        ) : null}
                    </div>

                    {isDelivery ? (
                        <div className="summary-delivery-fee">
                            <span>Delivery fee:</span>
                            <span>$5.00</span>
                        </div>
                    ) : null}
                    
            </div>

                <div className="summary-total">
                        <span>Total:</span>
                        <span>${calcTotal()}</span>
                        
                </div>

                <div className="summary-buttons">
                        <button className="summary-btn-secondary"
                        onClick={() => navigate("/order")}>
                            Add more
                        </button>

                        <button className="summary-btn-primary" 
                        onClick={handleSubmitOrder}>Submit Order</button>
                </div>
    </div>
)

}

export default OrderSummary