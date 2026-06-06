import React from "react";
import {
  NavLink,
  useNavigate,
  useLocation
} from "react-router-dom";

import {
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiHeart
} from "react-icons/fi";

import logo from "../assets/logo.png";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  const user =
    JSON.parse(localStorage.getItem("user"));

  const wishlistCount = user
    ? (
        JSON.parse(
          localStorage.getItem(
            `wishlist_${user.id}`
          )
        ) || []
      ).length
    : 0;

  const cartCount = user
    ? (
        JSON.parse(
          localStorage.getItem(
            `cart_${user.id}`
          )
        ) || []
      ).reduce(
        (total, item) =>
          total + (item.quantity || 1),
        0
      )
    : 0;

  return (

    <header className="header">

      <div className="logo">
        <img
          src={logo}
          alt="SugarPlum"
        />
      </div>

      <ul className="menu">

        <li>
          <NavLink to="/">
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/cakes">
            Cakes
          </NavLink>
        </li>

        <li>
          <NavLink to="/pastries">
            Pastries
          </NavLink>
        </li>

        <li>
          <NavLink to="/donuts">
            Donuts
          </NavLink>
        </li>

        <li>
          <NavLink to="/cupcakes">
            Cupcakes
          </NavLink>
        </li>

        <li>
          <NavLink to="/premiumdeserts">
            PremiumDeserts
          </NavLink>
        </li>

      </ul>

      <div className="header-icons">

        <div
          className="icon-box"
          onClick={() => navigate("/search")}
        >
          <FiSearch />
        </div>

        <div
          className="icon-box"
          onClick={() => {

            const user =
              JSON.parse(
                localStorage.getItem("user")
              );

            if (user) {
              navigate("/account");
            } else {
              navigate("/login");
            }

          }}
        >
          <FiUser />
        </div>

        <div
            className="icon-box cart-box"
            onClick={() => {

              if (user) {

                navigate("/wishlist");

              } else {

                navigate("/login");

              }

            }}
          >

            <FiHeart />

          </div>
        <div
          className="icon-box cart-box"
          onClick={() => {

            if (user) {

              navigate("/cart");

            } else {

              navigate("/login");

            }

          }}
        >

          <FiShoppingCart />

          <span>
            {cartCount}
          </span>

        </div>

      </div>

    </header>

  );
}

export default Navbar;