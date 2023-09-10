import * as React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { selectAuth, verifyTokenAsync } from "./redux/slices/authSlice";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import WorkoutList from "./components/WorkoutList/WorkoutList";

export default function App() {
  const { user } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token === "null") {
      console.log("token is null")
      localStorage.removeItem("token");
    } else if (token && !user) {
      console.log("token is not null, verifying user")
      dispatch(verifyTokenAsync());
      console.log(user, "user");
    }
  }, [user, token]);

  const BrowserRouter = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/profile", element: <Profile /> },
        { path: "/workouts", element: <WorkoutList /> },
      ],
    },
  ]);

  return (
    <>
      <div className="container">
        <RouterProvider router={BrowserRouter}></RouterProvider>
      </div>
    </>
  );
}
