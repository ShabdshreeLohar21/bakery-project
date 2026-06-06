import React, { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";

import cake1 from '../assets/cake1.jpg'
import cake2 from '../assets/cake2.jpg'
import cake3 from '../assets/cake3.jpg'
import cake4 from '../assets/cake4.jpg'
import cake5 from '../assets/cake5.jpg'
import cake6 from '../assets/cake6.jpg'
import cake7 from '../assets/cake7.jpg'
import cake8 from '../assets/cake8.jpg'
import cake9 from '../assets/cake9.jpg'
import cake10 from '../assets/cake10.jpg'
import cake11 from '../assets/cake11.jpg'
import cake12 from '../assets/cake12.jpg'
import cake13 from '../assets/cake13.jpg'
import cake14 from '../assets/cake14.jpg'
import cake15 from '../assets/cake15.jpg'
import cake16 from '../assets/cake16.jpg'
import cake17 from '../assets/cake17.jpg'
import cake18 from '../assets/cake18.jpg'
import cake19 from '../assets/cake19.jpg'
import cake20 from '../assets/cake20.jpg'

function Cake() {

  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  const cakeImages = {
    1: cake1,
    2: cake2,
    3: cake3,
    4: cake4,
    5: cake5,
    6: cake6,
    7: cake7,
    8: cake8,
    9: cake9,
    10: cake10,
    11: cake11,
    12: cake12,
    13: cake13,
    14: cake14,
    15: cake15,
    16: cake16,
    17: cake17,
    18: cake18,
    19: cake19,
    20: cake20
  };

  useEffect(() => {

    fetch("http://localhost:8080/products/all")
      .then((res) => res.json())
      .then((data) =>
        setProducts(
          data.filter(
            product => product.category === "Cakes"
          )
        )
      )
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
    JSON.parse(localStorage.getItem(cartKey)) || [];

  const existingProduct = cart.find(
    item => item.id === product.id
  );

  if (existingProduct) {

    existingProduct.quantity += 1;

  } else {

    cart.push({
      ...product,
      image: cakeImages[product.id],
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
        Our Delicious Cakes
      </h1>

      <div className="products-container">

        {products.map((product) => (

          <div
            className="product-card"
            key={product.id}
          >

            <img
              src={`/images/${product.category.toLowerCase()}/${product.imageUrl}`}
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

export default Cake;