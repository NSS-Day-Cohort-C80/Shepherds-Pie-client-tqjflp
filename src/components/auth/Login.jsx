import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getEmployees } from "../../services/employeeService"
import "./Login.css"

export const Login = () => {
  const [username, setUsername] = useState("")
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()

    getEmployees().then((employees) => {
      const foundEmployee = employees.find(
        (employee) => employee.username === username,
      )

      if (foundEmployee) {
        localStorage.setItem(
          "shepherd_employee",
          JSON.stringify({
            id: foundEmployee.id,
          }),
        )
        navigate("/order")
      } else {
        window.alert("Invalid Login")
      }
    })
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Shepherd's Pies</h1>
        <p>Employee sign in</p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
            required
            className="form-control"
          />
          <button type="submit" className="btn-primary">
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
