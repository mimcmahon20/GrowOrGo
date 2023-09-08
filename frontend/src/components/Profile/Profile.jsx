import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync, updateAsync, deleteAsync, selectAuth, getUserAsync } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(selectAuth);
  
  useEffect(() => {
    if(!user) {
      navigate('/login');
    } else {
      dispatch(getUserAsync());
    }
  }, [user, navigate, dispatch]);

  const [formData, setFormData] = useState({
    username: user ? user.username : '',
    email: user ? user.email : '',
    // ... other fields
  });

  const handleLogout = () => {
    dispatch(logoutAsync());
  };

  const handleUpdate = () => {
    dispatch(updateAsync(formData));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
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
      <h1>Profile</h1>
      <form>
        <div>
          <label>Name: </label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label>Email: </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        {/* ... other fields */}
        <button type="button" onClick={handleUpdate}>Update Profile</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleDelete}>Delete Account</button>
    </div>
  );
}
