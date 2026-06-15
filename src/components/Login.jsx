import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import API_URL from "../config";

function Login() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
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

  if (loading) return;

  setLoading(true);

  try {

    const response = await axios.post(
      `${API_URL}/users/login`,
      user
    );

    if (response.data) {
      setLoggedInUser(response.data);

      await axios.post(
        `${API_URL}/users/send-otp`,
        null,
        {
          params: {
            email: user.email
          }
        }
      );

      setShowOtp(true);

      alert("OTP sent to your email");

    } else {

      alert("Invalid Email or Password");

    }

  } catch (error) {

    console.log(error);

    alert("Login Failed");

  } finally {

    setLoading(false);

  }

};


const verifyOtp = async () => {

  try {

    const response = await axios.post(
      `${API_URL}/users/verify-otp`,
      null,
      {
        params: {
          email: user.email,
          otp: otp
        }
      }
    );

    if (response.data) {

 localStorage.setItem(
  "user",
  JSON.stringify(loggedInUser)
);

      alert("Login Successful");

      navigate("/");

    }

  } catch (error) {

    alert("Invalid OTP");

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

          {showOtp && (
            <input
              type="text"
              placeholder="Enter OTP"
              className="auth-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          )}



          {!showOtp ? (

            <button
              type="submit"
              className="auth-btn"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Login"}
            </button>

          ) : (

            <button
              type="button"
              className="auth-btn"
              onClick={verifyOtp}
            >
              Verify OTP
            </button>

          )}




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