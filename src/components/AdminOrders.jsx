import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import myordersbg from "../assets/myorders.jpg";

function AdminOrders() {

  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    const admin =
      localStorage.getItem("admin");

    if (!admin) {
      navigate("/admin");
      return;
    }

    fetchOrders();

  }, [navigate]);

  const fetchOrders = () => {

    axios
      .get("http://localhost:8080/orders/all")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  };

  const updateStatus = (id, status) => {

    axios
      .put(
        `http://localhost:8080/orders/status/${id}?status=${status}`
      )
      .then(() => {

        fetchOrders();

      })
      .catch((err) => {
        console.log(err);
      });

  };

  return (

    <div
      className="admin-orders-page"
      style={{
        backgroundImage: `url(${myordersbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh"
      }}
    >

      <h1 className="admin-title">
        Admin Orders
      </h1>

      {orders.map((order) => (

        <div
          className="admin-order-card"
          key={order.id}
        >

          <h2>
            Order #{order.id}
          </h2>

          <p>
            Customer : {order.customerName}
          </p>

          <p>
            Mobile : {order.mobile}
          </p>

          <p>
            Amount : ₹{order.totalAmount}
          </p>

          <p>
            Payment : {order.paymentMethod}
          </p>

          <p>
            Current Status :
            <b
              style={{
                color:
                  order.status === "Pending"
                    ? "orange"
                    : order.status === "Preparing"
                    ? "blue"
                    : order.status === "Out For Delivery"
                    ? "purple"
                    : order.status === "Delivered"
                    ? "green"
                    : "red"
              }}
            >
              {" "}{order.status}
            </b>
          </p>

          <select
            onChange={(e) =>
              updateStatus(
                order.id,
                e.target.value
              )
            }
            defaultValue=""
          >

            <option value="" disabled>
              Change Status
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Preparing">
              Preparing
            </option>

            <option value="Out For Delivery">
              Out For Delivery
            </option>

            <option value="Delivered">
              Delivered
            </option>

            <option value="Cancelled">
              Cancelled
            </option>

          </select>

        </div>

      ))}

    </div>

  );
}

export default AdminOrders;