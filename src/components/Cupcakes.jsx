import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

import cup1 from "../assets/cup1.jpg";
import cup2 from "../assets/cup2.jpg";
import cup3 from "../assets/cup3.jpg";
import cup4 from "../assets/cup4.jpg";
import cup5 from "../assets/cup5.jpg";
import cup6 from "../assets/cup6.jpg";
import cup7 from "../assets/cup7.jpg";
import cup8 from "../assets/cup8.jpg";
import cup9 from "../assets/cup9.jpg";
import cup10 from "../assets/cup10.jpg";
import cup11 from "../assets/cup11.jpg";
import cup12 from "../assets/cup12.jpg";
import cup13 from "../assets/cup13.jpg";
import cup14 from "../assets/cup14.jpg";
import cup15 from "../assets/cup15.jpg";
import cup16 from "../assets/cup16.jpg";
import cup17 from "../assets/cup17.jpg";
import cup18 from "../assets/cup18.jpg";
import cup19 from "../assets/cup19.jpg";
import cup20 from "../assets/cup20.jpg";

function Cupcakes() {

  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  const cupcakeImages = {
    62: cup1,
    63: cup2,
    64: cup3,
    65: cup4,
    66: cup5,
    67: cup6,
    68: cup7,
    69: cup8,
    70: cup9,
    71: cup10,
    72: cup11,
    73: cup12,
    74: cup13,
    75: cup14,
    76: cup15,
    77: cup16,
    78: cup17,
    79: cup18,
    80: cup19,
    81: cup20,
  };

  useEffect(() => {

    fetch("http://localhost:8080/products/cupcakes")
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
    item => item.id === `cupcake-${product.id}`
  );

  if (existingProduct) {

    existingProduct.quantity += 1;

  } else {

    cart.push({
      ...product,
      image: cupcakeImages[product.id],
      id: `cupcake-${product.id}`,
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
        Dreamy Cupcakes
      </h1>

      <div className="products-container">

        {products.map((product) => (

          <div
            className="product-card"
            key={product.id}
          >

            <img
              src={`/images/cupcakes/${product.imageUrl}`}
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

export default Cupcakes;