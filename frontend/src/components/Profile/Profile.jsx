import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../../redux/slices/authSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const handleLogout = () => {
    dispatch(logoutAsync());
  };

  return (
    <div className="profile">
      <h1>Profile</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
