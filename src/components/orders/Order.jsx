import { useEffect, useState } from "react"
//import { getEmployees } from "../../services/employeeService"
import { getCheeses, getSauces, getSizes, getToppings } from "../../services/menuService"
import { createPizza } from "../../services/orderService"
import "../orders/Order.css"

const Order = ({ currentUser }) => {
const [pizzaSizes, setPizzaSizes] = useState([])
const [pizzaCheese, setPizzaCheese] = useState([])
const [pizzaSauce, setPizzaSauce] = useState([])
const [pizzaToppings, setPizzaToppings] = useState([])
const [selectedCheese, setSelectedCheese] = useState(null)
const [selectedSauce, setSelectedSauce] = useState(null)
const [selectedSize, setSelectedSize] = useState(null)
const [selectedToppings, setSelectedToppings] = useState([])
const [cart, setCart] = useState([])
// const [driverEmployees, setDriverEmployees] = useState([])


useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || []
    setCart(savedCart)
}, [])


useEffect(() => {
    getSizes().then(setPizzaSizes)
    getCheeses().then(setPizzaCheese)
    getSauces().then(setPizzaSauce)
    getToppings().then(setPizzaToppings)
}, [])

const calcPizzaPrice = () => {
    let price = 0
    const size = pizzaSizes.find((s) => s.id === selectedSize)
    if (size) 
        {price += size.cost}
    selectedToppings.forEach((toppingId) => {
        const topping = pizzaToppings.find((t) => t.id === toppingId)
        if (topping) {price += topping.cost}
    })
    return price.toFixed(2)
}


    return (
        <div className="pizza-builder">
            <div className="pizza-section">
                <h3>Sizes</h3>
                {pizzaSizes.map((size) => (
                    <label key={size.id}>
                        <input
                        type="radio" 
                        name="sizes" 
                        value={size.id}
                        checked={selectedSize === size.id}
                        onChange={(event) => setSelectedSize(Number(event.target.value))}
                        />
                        {size.name}
                    </label>
                ))}
            </div>
            <div className="pizza-section">
                <h3>Cheese</h3>
                {pizzaCheese.map((cheese) => (
                    <label key={cheese.id}>
                        <input
                        type="radio" 
                        name="cheeses" 
                        value={cheese.id}
                        checked={selectedCheese === cheese.id}
                        onChange={(event) => setSelectedCheese(Number(event.target.value))}
                        />
                        {cheese.name}
                    </label>
                ))}
            </div>
            <div className="pizza-section">
                <h3>Sauces</h3>
                {pizzaSauce.map((sauce) => (
                    <label key={sauce.id}>
                        <input
                        type="radio" 
                        name="sauce" 
                        value={sauce.id}
                        checked={selectedSauce === sauce.id}
                        onChange={(event) => setSelectedSauce(Number(event.target.value))}
                        />
                        {sauce.name}
                    </label>
                ))}
            </div>
            <div className="pizza-section">
                <h3>Toppings</h3>
                {pizzaToppings.map((topping) => (
                <label key={topping.id}>
                    <input
                        type="checkbox"
                        value={topping.id}
                        checked={selectedToppings.includes(topping.id)}
                        onChange={(event) => {
                        const id = Number(event.target.value)
                        if (selectedToppings.includes(id)) {
                            setSelectedToppings(selectedToppings.filter(topping => topping !== id))
                        } else {
                            setSelectedToppings([...selectedToppings, id])
                        }
                    }}
                />
                {topping.name}
                </label>
                ))}
            </div>
            {cart.length > 0 ? (
            <div className="cart-preview">
                <h3>Current Order ({cart.length} pizzas)</h3>
                {cart.map((pizza) => (
                    <div key={pizza.id}>{pizza.size} - ${pizza.price}</div>
                ))}
            </div>
        ) : null}
            
            <div className="button-div">
                <button
                className="checkout-button"
                onClick={() => {
                    if (!selectedSize || !selectedCheese || !selectedSauce) 
                    {
                        alert("Please select size, cheese, and sauce")
                    }
                    else {
                        const pizzaPrice = parseFloat(calcPizzaPrice())
                        const newPizza = {
                            id: Date.now(),
                            size: pizzaSizes.find((s) => s.id === selectedSize)?.name,
                            cheese: pizzaCheese.find((c) => c.id === selectedCheese)?.name,
                            sauce: pizzaSauce.find((s) => s.id === selectedSauce)?.name,
                            toppings: selectedToppings.map((id) => pizzaToppings.find((t) => t.id ===parseInt(id))?.name).filter(Boolean),
                            price: pizzaPrice,
	                    }

                        const cart = JSON.parse(localStorage.getItem("cart")) || []
                        cart.push(newPizza)
                        localStorage.setItem("cart", JSON.stringify(cart))
                            alert("Pizza added!")
                            setCart([...cart])
                            setSelectedSize(null)
                            setSelectedCheese(null)
                            setSelectedSauce(null)
                            setSelectedToppings([])
                        }
                    
                }}>
                    Add Pizza
                </button>
                </div>
                <div>
                    <button onClick={() => navigate("/orderSummary")}>
                        View Cart
                    </button>
                </div>
        </div>
    )
}

export default Order