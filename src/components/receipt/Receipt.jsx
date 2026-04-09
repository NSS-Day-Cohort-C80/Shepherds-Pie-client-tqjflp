import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrdersByEmployeeId } from "../../services/orderService";
import { getEmployeesById } from "../../services/employeeService";
import "./Receipts.css";

const Receipts = ({ currentUser }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [employeeName, setEmployeeName] = useState("");

  useEffect(() => {
    if (!currentUser?.id) {
      navigate("/login");
      return;
    }

    getEmployeesById(currentUser.id).then((employees) => {
      if (employees.length > 0) {
        setEmployeeName(employees[0].fullName);
      }
    });

    getOrdersByEmployeeId(currentUser.id).then((fetchedOrders) => {
      setOrders(fetchedOrders);
    });
  }, [currentUser, navigate]);

  const calculateOrderTotal = (order) => {
    let total = 0;
    if (order.pizzas && Array.isArray(order.pizzas)) {
      total = order.pizzas.reduce((sum, pizza) => sum + pizza.price, 0);
    }
    if (order.delivererId) {
      total += 5;
    }
    return total.toFixed(2);
  };

  return (
    <>
      <div className="receipts-container">
        <div className="receipts-header">
          <h1>Receipts</h1>
          <span className="logged-in-user">Logged in as {employeeName}</span>
        </div>

        {orders.length > 0 ? (
          <table className="receipts-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Time/Date</th>
                <th>Cost</th>
                <th>Tip</th>
                <th>Delivery?</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    {order.time} {order.date}
                  </td>
                  <td>${calculateOrderTotal(order)}</td>
                  <td>${order.tip ? order.tip.toFixed(2) : "0.00"}</td>
                  <td>{order.delivererId ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-orders">No orders found</p>
        )}
      </div>
    </>
  );
};

export default Receipts;