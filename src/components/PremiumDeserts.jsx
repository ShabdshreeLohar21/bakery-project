import React, { useEffect, useState } from "react";

import { FaHeart } from "react-icons/fa";
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";
import p4 from "../assets/p4.jpg";
import p5 from "../assets/p5.jpg";
import p6 from "../assets/p6.jpg";
import p7 from "../assets/p7.jpg";
import p8 from "../assets/p8.jpg";
import p9 from "../assets/p9.jpg";
import p10 from "../assets/p10.jpg";
import p11 from "../assets/p11.jpg";
import p12 from "../assets/p12.jpg";
import p13 from "../assets/p13.jpg";
import p14 from "../assets/p14.jpg";
import p15 from "../assets/p15.jpg";
import p16 from "../assets/p16.jpg";
import p17 from "../assets/p17.jpg";
import p18 from "../assets/p18.jpg";
import p19 from "../assets/p19.jpg";
import p20 from "../assets/p20.jpg";

function PremiumDeserts() {

  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  const dessertImages = {
    82: p1,
    83: p2,
    84: p3,
    85: p4,
    86: p5,
    87: p6,
    88: p7,
    89: p8,
    90: p9,
    91: p10,
    92: p11,
    93: p12,
    94: p13,
    95: p14,
    96: p15,
    97: p16,
    98: p17,
    99: p18,
    100: p19,
    101: p20,
  };

  useEffect(() => {

    fetch("http://localhost:8080/products/premiumdesserts")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));

  }, []);

  useEffect(() => {

    const user =
      JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    fetch(
      `http://localhost:8080/wishlist/products/${user.id}`
    )
      .then((res) => res.json())
      .then((data) => {

        setWishlistIds(
          data.map(item => item.productId)
        );

      })
      .catch((err) => console.log(err));

  }, []);

  const isInWishlist = (productId) => {

    return wishlistIds.includes(productId);

  };

  const addToWishlist = async (product) => {

    const user =
      JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    try {

      if (wishlistIds.includes(product.id)) {

        await fetch(
          `http://localhost:8080/wishlist/remove/${user.id}/${product.id}`,
          {
            method: "DELETE"
          }
        );

        setWishlistIds(
          wishlistIds.filter(
            id => id !== product.id
          )
        );

      } else {

        await fetch(
          "http://localhost:8080/wishlist/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userId: user.id,
              productId: product.id
            })
          }
        );

        setWishlistIds([
          ...wishlistIds,
          product.id
        ]);

      }

    } catch (error) {

      console.log(error);

    }
  };

  


const addToCart = (product) => {

  const user =
    JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return;
  }

  const cartKey =
    `cart_${user.id}`;

  let cart =
    JSON.parse(
      localStorage.getItem(cartKey)
    ) || [];

  const existingProduct = cart.find(
    item => item.id === `dessert-${product.id}`
  );

  if (existingProduct) {

    existingProduct.quantity += 1;

  } else {

    cart.push({
      ...product,
      image: dessertImages[product.id],
      id: `dessert-${product.id}`,
      quantity: 1
    });

  }

  localStorage.setItem(
    cartKey,
    JSON.stringify(cart)
  );

};











  return (

    <div className="products-page">

      <h1 className="page-title">
        Premium Desserts
      </h1>

      <div className="products-container">

        {products.map((product) => (

          <div
            className="product-card"
            key={product.id}
          >

            <img
              src={`/images/premiumdesserts/${product.imageUrl}`}
              alt={product.name}
              className="product-img"
            />

            <div className="product-info">

              <h3>{product.name}</h3>

              <p className="product-price">
                ₹{product.price}
              </p>

              <div className="product-actions">

                <button
                  className="add-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add To Cart
                </button>

                <button
                  className="wishlist-btn"
                  onClick={() => addToWishlist(product)}
                >
                  <FaHeart
                    color={
                      isInWishlist(product.id)
                        ? "#ff5c93"
                        : "#d9d9d9"
                    }
                  />
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default PremiumDeserts;