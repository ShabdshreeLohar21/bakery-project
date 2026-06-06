import React, { useEffect, useState } from 'react';
import { FaHeart } from "react-icons/fa";

import pastries1 from "../assets/pastries1.jpg";
import pastries2 from "../assets/pastries2.jpg";
import pastries3 from "../assets/pastries3.jpg.jpg";
import pastries4 from "../assets/pastries4.jpg.jpg";
import pastries5 from "../assets/pastries5.jpg.jpg";
import pastries7 from "../assets/pastries7.jpg.jpg";
import pastries8 from "../assets/pastries8.jpg";
import pastries9 from "../assets/pastries9.jpg";
import pastries10 from "../assets/pastries10.jpg";
import pastries11 from "../assets/pastries11.jpg";
import pastries12 from "../assets/pastries12.jpg";
import pastries13 from "../assets/pastries13.jpg";
import pastries14 from "../assets/pastries14.jpg";
import pastries15 from "../assets/pastries15.jpg";
import pastries16 from "../assets/pastries16.jpg";
import pastries17 from "../assets/pastries17.jpg";
import pastries18 from "../assets/pastries18.jpg";
import pastries19 from "../assets/pastries19.jpg";
import pastries20 from "../assets/pastries20.jpg";
import pastries21 from "../assets/pastries21.jpg";
import pastries22 from "../assets/pastries22.jpg";

function Pastries() {

  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  const pastriesImages = {
    21: pastries1,
    22: pastries2,
    23: pastries3,
    24: pastries4,
    25: pastries5,
    26: pastries7,
    27: pastries8,
    28: pastries9,
    29: pastries10,
    30: pastries11,
    31: pastries12,
    32: pastries13,
    33: pastries14,
    34: pastries15,
    35: pastries16,
    36: pastries17,
    37: pastries18,
    38: pastries19,
    39: pastries20,
    40: pastries21,
    41: pastries22
  };

  useEffect(() => {

    fetch("http://localhost:8080/products/pastries")
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
      image: pastriesImages[product.id],
      quantity: 1
    });

  }

  localStorage.setItem(
    cartKey,
    JSON.stringify(cart)
  );

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
        prev =>
          prev.filter(
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

      setWishlistIds(
        prev => [...prev, product.id]
      );
    }

  } catch (error) {

    console.log(error);
  }
};





  const isInWishlist = (productId) => {

    return wishlistIds.includes(productId);

  };

  return (

    <div className="products-page">

      <h1 className="page-title">
        Our Pastries
      </h1>

      <div className="products-container">

        {products.map((product) => (

          <div
            className="product-card"
            key={product.id}
          >

            <img
              src={`/images/pastries/${product.imageUrl}`}
              alt={product.name}
              className="product-img"
            />

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

        ))}

      </div>

    </div>

  );
}

export default Pastries;