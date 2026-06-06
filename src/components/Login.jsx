import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import API_URL from "../config";

function Login() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        `${API_URL}/users/login`,
        user
      );

      if (response.data) {

        localStorage.setItem(
          "user",
          JSON.stringify(response.data)
        );

        alert("Login Successful!");

        navigate("/");

      } else {
        alert("Invalid Email or Password");
      }

    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (

    <div className="auth-page">

      <div className="auth-card
      login-card">
        <h2>Welcome Back</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="auth-input"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="auth-input"
            value={user.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="auth-btn">
            Login
          </button>

        </form>

        <h4>
          Don't have an account?
          <Link to="/signup"> Signup</Link>
        </h4>

      </div>

    </div>
  )
}

export default Login