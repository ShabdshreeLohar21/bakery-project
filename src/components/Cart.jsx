import cartbg from "../assets/cart.jpg";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



function Cart() {
  
  
const navigate = useNavigate();
  const user =
    JSON.parse(localStorage.getItem("user"));

  const cartKey =
    user ? `cart_${user.id}` : "cart";

    const [cartItems, setCartItems] = useState(
  JSON.parse(localStorage.getItem(cartKey)) || []
);

  const total = cartItems.reduce(
    (sum, item) =>
      sum + (Number(item.price) * (item.quantity || 1)),
    0
  );

  const updateQuantity = (index, change) => {

  let updatedCart = [...cartItems];

  updatedCart[index].quantity =
    (updatedCart[index].quantity || 1) + change;

  if (updatedCart[index].quantity <= 0) {

    updatedCart.splice(index, 1);

  }

  setCartItems(updatedCart);

  localStorage.setItem(
    cartKey,
    JSON.stringify(updatedCart)
  );

  window.dispatchEvent(
  new Event("cartUpdated")
);



  };

  return (

    <div
      className="cart-page"
      style={{
        backgroundImage: `url(${cartbg})`
      }}
    >

      <div className="cart-content">

        <div className="cart-items">

          {cartItems.length === 0 ? (

            <h2
              style={{
                textAlign: "center",
                color: "white",
                marginTop: "50px"
              }}
            >
              Your Cart Is Empty
            </h2>

          ) : (

            cartItems.map((item, index) => (

              <div
                className="cart-item"
                key={index}
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-img"
                />

                <div className="cart-item-details">

                  <h3>{item.name}</h3>

                  <p>{item.description}</p>

                  <h4>₹{item.price}</h4>

                </div>

                <div className="qty-box">

                  <button
                    onClick={() =>
                      updateQuantity(index, -1)
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity || 1}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(index, 1)
                    }
                  >
                    +
                  </button>

                </div>

              </div>

            ))

          )}

          {cartItems.length > 0 && (

            <div className="cart-footer">

              <div className="total-box">

                <h2>
                  Total : ₹{total}
                </h2>

              </div>

              <button
                className="checkout-btn"
                onClick={() =>
                 navigate("/checkout")
                }
              >
                Proceed To Checkout
              </button>

            </div>

          )}

        </div>

      </div>

    </div>

  );
}

export default Cart;