import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminProducts() {

  const [products, setProducts] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    imageUrl: ""
  });

  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    const admin =
      localStorage.getItem("admin");

    if (!admin) {
      navigate("/admin");
      return;
    }

    loadProducts();

  }, []);

  const loadProducts = () => {

    axios
      .get("http://localhost:8080/products/all")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  };

  const handleChange = (e) => {

    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });

  };

  const saveProduct = () => {

    if (editId === null) {

      axios
        .post(
          "http://localhost:8080/products/add",
          product
        )
        .then(() => {

          setProduct({
            name: "",
            description: "",
            price: "",
            stock: "",
            category: "",
            imageUrl: ""
          });

          loadProducts();

        });

    } else {

      axios
        .put(
          `http://localhost:8080/products/update/${editId}`,
          product
        )
        .then(() => {

          setEditId(null);

          setProduct({
            name: "",
            description: "",
            price: "",
            stock: "",
            category: "",
            imageUrl: ""
          });

          loadProducts();

        });

    }

  };

  const deleteProduct = (id) => {

    axios
      .delete(
        `http://localhost:8080/products/delete/${id}`
      )
      .then(() => {

        loadProducts();

      });

  };

  const editProduct = (p) => {

    setEditId(p.id);

    setProduct({
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock,
      category: p.category,
      imageUrl: p.imageUrl
    });

  };

  return (

    <div className="admin-products-page">

      <h1>Admin Product Management</h1>

      <div className="product-form">

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={product.imageUrl}
          onChange={handleChange}
        />

        <button onClick={saveProduct}>

          {editId === null
            ? "Add Product"
            : "Update Product"}

        </button>

      </div>

      <div>

        {products.map((p) => (

          <div
            key={p.id}
            className="admin-product-card"
          >

            <img
              src={`/images/${p.category.toLowerCase()}/${p.imageUrl}`}
              alt={p.name}
              width="150"
            />

            <h3>{p.name}</h3>

            <p>{p.description}</p>

            <p>₹{p.price}</p>

            <p>Stock : {p.stock}</p>

            <p>{p.category}</p>

            <button
              onClick={() => editProduct(p)}
            >
              Edit
            </button>

            <button
              onClick={() => deleteProduct(p.id)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  );
}

export default AdminProducts;