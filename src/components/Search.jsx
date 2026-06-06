import React, { useEffect, useState } from "react";

function Search() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    fetch("http://localhost:8080/products/all")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));

  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product) => {

    let cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct =
      cart.find(item => item.id === product.id);

    if (existingProduct) {

      existingProduct.quantity += 1;

    } else {

      cart.push({
        ...product,
        quantity: 1
      });

    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert(product.name + " added to cart!");

  };

  return (

    <div className="products-page">

      <h1 className="page-title">
        Search Products
      </h1>

      <div
        style={{
          textAlign: "center",
          marginBottom: "30px"
        }}
      >

        <input
          type="text"
          placeholder="Search cakes, pastries, donuts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "450px",
            padding: "15px",
            borderRadius: "12px",
            border: "1px solid #ccc",
            fontSize: "18px"
          }}
        />

      </div>

      <div className="products-container">

        {filteredProducts.map((product) => (

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

              <button
                className="add-cart-btn"
                onClick={() => addToCart(product)}
              >
                Add To Cart
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Search;