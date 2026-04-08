import { Routes, Route } from "react-router-dom";
import { Login } from "./components/auth/Login";
import Order from "./components/orders/Order"
import Navbar from "./components/nav/Navbar.jsx"
import "./App.css";
const Receipts = () => <div>Receipts Page</div>;
function App() {
  return (
    <>
      <div className="App">Shepherd's Pies</div>
        <Navbar />
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<ApplicationViews />} />
        </Routes>
    </>
  )
}

export default App;
