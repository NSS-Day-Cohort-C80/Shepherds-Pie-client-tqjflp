export const getCheeses = () => {
    return fetch(`http://localhost:8088/cheeses`).then((res) => res.json())
}

export const getSauces = () => {
    return fetch(`http://localhost:8088/sauces`).then((res) => res.json())
}

export const getSizes = () => {
    return fetch(`http://localhost:8088/sizes`).then((res) => res.json())
}

export const getToppings = () => {
    return fetch(`http://localhost:8088/toppings`).then((res) => res.json())
}