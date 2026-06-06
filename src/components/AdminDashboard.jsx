import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    const admin =
      localStorage.getItem("admin");

    if (!admin) {
      navigate("/admin");
      return;
    }

    axios
      .get("http://localhost:8080/products/all")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8080/orders/all")
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));

  }, [navigate]);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const logout = () => {

    localStorage.clear();

    navigate("/admin");

  };

  return (

    <div className="admin-dashboard">

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px"
        }}
      >

        <h1 className="dashboard-title">
          Admin Dashboard
        </h1>

        <button
          onClick={logout}
          className="logout-btn"
        >
          Logout
        </button>

      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>

        <div className="dashboard-card">
          <h3>Pending Orders</h3>
          <p>{pendingOrders}</p>
        </div>

        <div className="dashboard-card">
          <h3>Delivered Orders</h3>
          <p>{deliveredOrders}</p>
        </div>

        <div className="dashboard-card revenue-card">
          <h3>Total Revenue</h3>
          <p>₹{totalRevenue}</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/products")}
          style={{ cursor: "pointer" }}
        >
          <h3>Manage Products</h3>
          <p>Open</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/orders")}
          style={{ cursor: "pointer" }}
        >
          <h3>Manage Orders</h3>
          <p>Open</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <h3>Customer Site</h3>
          <p>Visit</p>
        </div>

      </div>

    </div>

  );
}

export default AdminDashboard;