import { useEffect, useState } from "react";
import axios from "axios";
import myordersbg from "../assets/myorders.jpg";

function MyOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const user =
      JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    axios
      .get(`http://localhost:8080/orders/user/${user.id}`)
      .then(async (res) => {

        const ordersWithItems =
          await Promise.all(

            res.data.map(async (order) => {

              const itemRes =
                await axios.get(
                  `http://localhost:8080/orders/items/${order.id}`
                );

              return {
                ...order,
                items: itemRes.data
              };
            })

          );

        setOrders(ordersWithItems);

      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (

    <div
      className="orders-page"
      style={{
        backgroundImage: `url(${myordersbg})`
      }}
    >

      <h1 className="orders-title">
        My Orders
      </h1>

      {orders.length === 0 ? (

        <h2 className="no-orders">
          No Orders Found
        </h2>

      ) : (

        orders.map((order) => (

          <div
            className="order-card"
            key={order.id}
          >

            <h2>
              Order #{order.id}
            </h2>

            <p>
              Amount : ₹{order.totalAmount}
            </p>

            <p>
              Payment : {order.paymentMethod}
            </p>

            <p>

              Status :

              <span
                style={{
                  marginLeft: "10px",
                  fontWeight: "bold",
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
                {order.status}
              </span>

            </p>

            <p>
              Mobile : {order.mobile}
            </p>

            <p>
              Address : {order.address}
            </p>

            <div style={{ marginTop: "25px" }}></div>

            <h3>
              Ordered Products
            </h3>

            {order.items &&
              order.items.map((item) => (

                <div key={item.id}>
                  {item.productName}
                </div>

              ))}

            <p>
              Date : {order.orderDate}
            </p>

          </div>

        ))

      )}

    </div>

  );
}

export default MyOrders;