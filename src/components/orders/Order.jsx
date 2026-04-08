import { useEffect, useState } from "react"
//import { getEmployees } from "../../services/employeeService"
import { getCheeses, getSauces, getSizes, getToppings } from "../../services/menuService"
import { createPizza } from "../../services/orderService"

const Order = ({ currentUser }) => {
const [pizzaSizes, setPizzaSizes] = useState([])
const [pizzaCheese, setPizzaCheese] = useState([])
const [pizzaSauce, setPizzaSauce] = useState([])
const [pizzaToppings, setPizzaToppings] = useState([])
const [selectedCheese, setSelectedCheese] = useState(null)
const [selectedSauce, setSelectedSauce] = useState(null)
const [selectedSize, setSelectedSize] = useState(null)
const [selectedToppings, setSelectedToppings] = useState([])
// const [driverEmployees, setDriverEmployees] = useState([])





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
        <>
            <div name="pizzaSizes">
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
            <div name="pizzaCheese">
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
            <div name="pizzaSauce">
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
            <div name="toppings">
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
            <div name="orderButton">
                <button
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
                        createPizza(newPizza).then(()=>{
                            alert("Pizza added!")
                            setSelectedSize(null)
                            setSelectedCheese(null)
                            setSelectedSauce(null)
                            setSelectedToppings([])
                        })
                    }
                }}>
                    Add Pizza
                </button>
            </div>
        </>
    )
}

export default Order