import { NavLink, useLocation, useNavigate } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
 // const location = useLocation()
  const navigate = useNavigate()

  // if (location.pathname === "/login" || location.pathname === "/") return null;

  const user = localStorage.getItem("shepherd_employee")

  const handleLogout = () => {
    localStorage.removeItem("shepherd_employee")
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <ul>
        <h2 className="navbar-title">Shepherd's Pies Pizza Portal</h2>
        <ul className="navbar-links" />
        <li className="navbar-item">
          <NavLink to="/receipts">Receipts</NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/order">Order</NavLink>
        </li>

        {user ? (
          <li className="navbar-item navbar-logout">
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : null}
      </ul>
    </nav>
  )
}

export default Navbar
