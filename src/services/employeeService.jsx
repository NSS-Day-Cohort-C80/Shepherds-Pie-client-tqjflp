export const getEmployees = () => {
    return fetch(`http://localhost:8088/employees`).then((res) => res.json())
}

export const getEmployeesById = (id) => {
    return fetch(`http://localhost:8088/employees?id=${id}`).then((res) => res.json())
}