import checkoutbg from "../assets/checkout.jpg";
import { useState } from "react";
import axios from "axios";

function Checkout() {

  const user =
    JSON.parse(localStorage.getItem("user"));

  const cartKey =
    user ? `cart_${user.id}` : "cart";

  const cart =
    JSON.parse(
      localStorage.getItem(cartKey)
    ) || [];

  const total = cart.reduce(
    (sum, item) =>
      sum + (Number(item.price) * (item.quantity || 1)),
    0
  );

  const [order, setOrder] = useState({
    customerName: "",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "COD"
  });

  const handleChange = (e) => {

    setOrder({
      ...order,
      [e.target.name]: e.target.value
    });

  };

  const handleOrder = async () => {

    if (!user) {

      alert("Please Login First");
      return;

    }

    if (!order.customerName.trim()) {

      alert("Please enter your name");
      return;

    }

    if (!order.mobile.trim()) {

      alert("Please enter mobile number");
      return;

    }

    if (order.mobile.length !== 10) {

      alert("Mobile number must be 10 digits");
      return;

    }

    if (!order.address.trim()) {

      alert("Please enter address");
      return;

    }

    if (!order.city.trim()) {

      alert("Please enter city");
      return;

    }

    if (!order.pincode.trim()) {

      alert("Please enter pincode");
      return;

    }

    if (order.pincode.length !== 6) {

      alert("Pincode must be 6 digits");
      return;

    }

    try {

      await axios.post(
        "http://localhost:8080/orders/place",
        {
          userId: user.id,

          customerName: order.customerName,
          mobile: order.mobile,
          address: order.address,
          city: order.city,
          pincode: order.pincode,

          totalAmount: total,

          paymentMethod: "COD",

          status: "Pending",

          items: cart
        }
      );

      alert("Order Placed Successfully!");

      localStorage.removeItem(
        cartKey
      );

      window.location.href =
        "/myorders";

    } catch (error) {

      console.log(error);

      alert("Failed To Place Order");

    }

  };

  return (

    <div
      className="checkout-page"
      style={{
        backgroundImage: `url(${checkoutbg})`
      }}
    >

      <div className="checkout-card">

        <h1>Checkout</h1>

        <input
          type="text"
          name="customerName"
          placeholder="Enter Full Name"
          value={order.customerName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="mobile"
          placeholder="Enter Mobile Number"
          value={order.mobile}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Enter Address"
          value={order.address}
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="Enter City"
          value={order.city}
          onChange={handleChange}
        />

        <input
          type="text"
          name="pincode"
          placeholder="Enter Pincode"
          value={order.pincode}
          onChange={handleChange}
        />

        <h3
          style={{
            textAlign: "left",
            marginTop: "15px",
            color: "#5b3b2f"
          }}
        >
          Payment Method
        </h3>

        <input
          type="text"
          value="Cash On Delivery"
          readOnly
        />

        <h2>
          Total : ₹{total}
        </h2>

        <button
          className="place-order-btn"
          onClick={handleOrder}
        >
          Place Order
        </button>

      </div>

    </div>

  );
}

export default Checkout;