import React, { useState } from "react";
import axios from "axios";

function EditProfile() {

  const user = JSON.parse(localStorage.getItem("user"));
const [name, setName] = useState(user?.username || "");
const [email, setEmail] = useState(user?.email || "");
const [mobile, setMobile] = useState(user?.mobile || "");
const [address, setAddress] = useState(user?.address || "");

    const handleSave = () => {

        axios.put(
            `http://localhost:8080/users/update/${user.id}`,
            {
            username: name,
            email: email,
            mobile: mobile,
            address: address
            }
        )
        .then((res) => {

            localStorage.setItem(
            "user",
            JSON.stringify(res.data)
            );

            alert("Profile Updated Successfully");
        })
        .catch((err) => {
            console.log(err);
            alert("Update Failed");
        });
};

  return (
    <div className="edit-profile-container">

      <h1>Edit Profile</h1>

      <div className="edit-profile-card">

        <label>Name</label>

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <label>Email</label>

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <label>Mobile</label>

        <input
        type="text"
        value={mobile}
        onChange={(e) =>
            setMobile(e.target.value)
        }
        />

            <label>Address</label>

        <input
        type="text"
        value={address}
        onChange={(e) =>
            setAddress(e.target.value)
        }
        />
        <button
          className="save-btn"
          onClick={handleSave}
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}

export default EditProfile;