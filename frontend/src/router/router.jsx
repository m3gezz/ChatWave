import { createBrowserRouter, Navigate } from "react-router-dom";
import NotFound from "../pages/all/NotFound";
import GuestLayout from "../layouts/GuestLayout";
import Signin from "../pages/guest/Signin";
import Signup from "../pages/guest/Signup";
import Profile from "../pages/user/Profile";
import Main from "../pages/user/Main";
import UserLayout from "../layouts/UserLayout";

const routes = [
  {
    path: "/",
    element: <Navigate to={"/guest"} />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/guest",
    element: <GuestLayout />,
    children: [
      {
        path: "/guest",
        element: <Signin />,
      },
      {
        path: "/guest/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        path: "/user",
        element: <Main />,
      },
      {
        path: "/user/profile",
        element: <Profile />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
