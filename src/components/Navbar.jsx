import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // if (location.pathname === "/login" || location.pathname === "/") return null;

  const user = localStorage.getItem("learning_user");

  const handleLogout = () => {
    localStorage.removeItem("learning_user");
    navigate("/login");
  };

  return (
    <nav>
      <h2>Pizza Portal</h2>

      <ul>
        <li>
          <NavLink to="/receipts">Receipts</NavLink>
        </li>
        <li>
          <NavLink to="/order">Order</NavLink>
        </li>

        {user ? (
          <li>
            <button onClick={handleLogout}>
              Logout
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

export default Navbar;