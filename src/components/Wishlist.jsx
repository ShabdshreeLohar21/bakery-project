import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";

function Wishlist() {

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {

    const user =
      JSON.parse(localStorage.getItem("user"));

    if (!user) {
      return;
    }

    fetch(
      `http://localhost:8080/wishlist/products/${user.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWishlist(data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  const removeFromWishlist = async (productId) => {

    const user =
      JSON.parse(localStorage.getItem("user"));

    try {

      await fetch(
        `http://localhost:8080/wishlist/remove/${user.id}/${productId}`,
        {
          method: "DELETE"
        }
      );

      setWishlist(
        wishlist.filter(
          item => item.productId !== productId
        )
      );

    } catch (error) {

      console.log(error);

    }
  };

  const moveToCart = async (product) => {

    const user =
      JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    const cartKey =
      `cart_${user.id}`;

    let cart =
      JSON.parse(
        localStorage.getItem(cartKey)
      ) || [];

    const existingProduct =
      cart.find(
        item => item.id === product.productId
      );

    if (existingProduct) {

      existingProduct.quantity += 1;

    } else {

      cart.push({
        id: product.productId,
        name: product.name,
        price: product.price,
        category: product.category,
        imageUrl: product.imageUrl,
        image: `/images/${product.category.toLowerCase()}/${product.imageUrl}`,
        quantity: 1
      });

    }

    localStorage.setItem(
      cartKey,
      JSON.stringify(cart)
    );

    try {

      await fetch(
        `http://localhost:8080/wishlist/remove/${user.id}/${product.productId}`,
        {
          method: "DELETE"
        }
      );

      setWishlist(
        wishlist.filter(
          item =>
            item.productId !== product.productId
        )
      );

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="products-page">

      <h1 className="page-title">
        My Wishlist
      </h1>

      <div className="products-container">

        {wishlist.length === 0 ? (

          <h2>No Products In Wishlist</h2>

        ) : (

          wishlist.map((product) => (

            <div
              key={`${product.productId}-${product.name}`}
              className="product-card"
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
                    onClick={() => moveToCart(product)}
                  >
                    Move To Cart
                  </button>

                  <button
                    className="wishlist-btn"
                    onClick={() =>
                      removeFromWishlist(
                        product.productId
                      )
                    }
                  >
                    <FaHeart color="#ff5c93" />
                  </button>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );
}

export default Wishlist;