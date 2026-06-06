import React from "react";
import { useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="account-container">
        <h1>Please Login First</h1>
      </div>
    );
  }

  return (
    <div className="account-container">

      <h1 className="account-title">My Account</h1>

      <div className="profile-card">

        <h2>Profile Information</h2>

        <div className="profile-info">
          <p><strong>Name:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

      </div>

      <div className="account-actions">

        <button
          className="account-btn"
          onClick={() => navigate("/myorders")}
        >
          My Orders
        </button>

        <button
            className="account-btn"
            onClick={() => navigate("/edit-profile")}>Edit Profile
         </button>
         
        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Account;