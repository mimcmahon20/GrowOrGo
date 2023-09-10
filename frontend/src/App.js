import * as React from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { selectAuth, getUserAsync } from "./redux/slices/authSlice";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import WorkoutList from "./components/WorkoutList/WorkoutList";

export default function App() {
  const { user } = useSelector(selectAuth);
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    if (token === "null") {
      localStorage.removeItem("token");
    } else if (token && !user) {
      getUserAsync();
      console.log(user);
    }
  }, [user]);

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
