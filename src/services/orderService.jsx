export const getOrders = () => {
  return fetch(`http://localhost:8088/orders`).then((res) => res.json())
}

//will need to add ?_expand=employee&_embed=pizzas when we need order totals
export const getOrderById = (id) => {
  return fetch(`http://localhost:8088/orders/${id}?_expand=employee`).then(
    (res) => res.json(),
  )
}

export const getOrdersByEmployeeId = (employeeId) => {
  return fetch(`http://localhost:8088/orders?employeeId=${employeeId}`).then(
    (res) => res.json(),
  )
}

export const createOrder = (order) => {
    return fetch(`http://localhost:8088/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    })
}

export const editOrder = (order) => {
    return fetch(`http://localhost:8088/orders/${order.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    })
}

export const deleteOrder = (orderId) => {
    return fetch(`http://localhost:8088/orders/${orderId}`, {
        method: "DELETE",
    })
}

export const createPizza = (pizza) => {
    return fetch(`http://localhost:8088/pizzas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pizza),
    }).then((res) => res.json())
}