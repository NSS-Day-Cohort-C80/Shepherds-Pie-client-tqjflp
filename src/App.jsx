import { Routes, Route } from "react-router-dom";
// import Login from "./components/auth/Login";
// import Order from "./components/Order"
<<<<<<< HEAD
import Navbar from "./components/Navbar.jsx"
=======
import Navbar from "./components/nav/Navbar.jsx"
>>>>>>> e939bb848bcb770fd2d3e8dbb0fdac8eb1dc57cf
import "./App.css";
const Login = () => <div>Login Page</div>;
const Receipts = () => <div>Receipts Page</div>;
const Order = () => <div>Order Page</div>;
function App() {
  return (
    <>
      <div className="App">Shepherd's Pies</div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/receipts" element={<Receipts />} />
          <Route path="/order" element={<Order />} />
        </Routes>
    </>
  )
}

export default App;
