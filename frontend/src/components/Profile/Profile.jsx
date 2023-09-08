import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutAsync,
  updateAsync,
  deleteAsync,
  selectAuth,
  getUserAsync,
} from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(selectAuth);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (!dataLoaded) {
      console.log(
        dispatch(getUserAsync()).then(() => {
          setDataLoaded(true);
        })
      );
    }
  }, [user, navigate, dispatch, dataLoaded]);

  const [formData, setFormData] = useState({
    username: user ? user.username : "",
    email: user ? user.email : "",
    // ... other fields
  });

  const handleLogout = () => {
    dispatch(logoutAsync());
  };

  const handleUpdate = () => {
    dispatch(updateAsync(formData)).then(() => {
      setDataLoaded(false);
      setFormData({
        username: user ? user.username : "",
        email: user ? user.email : "",
      });
    });
  };

  const handleDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    ) {
      dispatch(deleteAsync());
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="profile">
      {user && (
        <>
          <h1>Profile</h1>
          <h2>Welcome, {user && user.username}</h2>
          <p>Email: {user.email}</p>
        </>
      )}

      {/* <p>Date joined: {user.dateRegistered.substring(0,10)}</p> */}
      <form>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        {/* ... other fields */}
        <button type="button" onClick={handleUpdate}>
          Update Profile
        </button>
      </form>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleDelete}>Delete Account</button>
    </div>
  );
}
