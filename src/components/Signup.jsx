import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import API_URL from "../config";

function Signup() {

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const response = await fetch(
  `${API_URL}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        }
      )

      const data = await response.json()

      alert("Signup Successful!")

      console.log(data)

      setUser({
        username: "",
        email: "",
        password: ""
      })

    } catch (error) {
      console.log(error)
      alert("Signup Failed!")
    }
  }

  return (

    <div className="auth-page">

      <div className="auth-card signup-card">

        <h2>Create Account</h2>

        <p>Join SugarPlum Desserts ✨</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="username"
            placeholder="Enter Name"
            className="auth-input"
            value={user.username}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="auth-input"
            value={user.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="auth-input"
            value={user.password}
            onChange={handleChange}
          />

          <button type="submit" className="auth-btn">
            Signup
          </button>

        </form>

        <h4>
          Already have an account?
          <Link to="/login"> Login</Link>
        </h4>

      </div>

    </div>
  )
}

export default Signup