import React, { useEffect, useState } from 'react';
import { FaHeart } from "react-icons/fa";

import donut1 from "../assets/donut1.jpg";
import donut2 from "../assets/donut2.jpg";
import donut3 from "../assets/donut3.jpg";
import donut4 from "../assets/donut4.jpg";
import donut5 from "../assets/donut5.jpg";
import donut6 from "../assets/donut6.jpg";
import donut7 from "../assets/donut7.jpg";
import donut8 from "../assets/donut8.jpg";
import donut9 from "../assets/donut9.jpg";
import donut10 from "../assets/donut10.jpg";
import donut11 from "../assets/donut11.jpg";
import donut12 from "../assets/donut12.jpg";
import donut13 from "../assets/donut13.jpg";
import donut14 from "../assets/donut14.jpg";
import donut15 from "../assets/donut15.jpg";
import donut16 from "../assets/donut16.jpg";
import donut17 from "../assets/donut17.jpg";
import donut18 from "../assets/donut18.jpg";
import donut19 from "../assets/donut19.jpg";
import donut20 from "../assets/donut20.jpg";

function Donuts() {

  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  const donutImages = {
    42: donut1,
    43: donut2,
    44: donut3,
    45: donut4,
    46: donut5,
    47: donut6,
    48: donut7,
    49: donut8,
    50: donut9,
    51: donut10,
    52: donut11,
    53: donut12,
    54: donut13,
    55: donut14,
    56: donut15,
    57: donut16,
    58: donut17,
    59: donut18,
    60: donut19,
    61: donut20
  };

  useEffect(() => {

    fetch("http://localhost:8080/products/donuts")
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
    item => item.id === product.id
  );

  if (existingProduct) {

    existingProduct.quantity += 1;

  } else {

    cart.push({
      ...product,
      image: donutImages[product.id],
      quantity: 1
    });

  }

  localStorage.setItem(
    cartKey,
    JSON.stringify(cart)
  );

};




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

  return (

    <div className="products-page">

      <h1 className="page-title">
        Sweet Donuts
      </h1>

      <div className="products-container">

        {products.map((product) => (

          <div
            className="product-card"
            key={product.id}
          >

            <img
              src={`/images/donuts/${product.imageUrl}`}
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

export default Donuts;