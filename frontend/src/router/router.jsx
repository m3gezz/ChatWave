import { createBrowserRouter, Navigate } from "react-router-dom";
import NotFound from "@/pages/all/NotFound";
import GuestLayout from "@/layouts/GuestLayout";
import Signin from "@/pages/guest/Signin";
import Signup from "@/pages/guest/Signup";
import Profile from "@/pages/user/verified/Profile";
import Main from "@/pages/user/verified/Main";
import UserLayout from "@/layouts/UserLayout";
import EmailVerificationLayout from "@/layouts/EmailVerificationLayout";
import EmailVerification from "@/pages/user/non-verified/EmailVerification";
import ResetPassword from "@/pages/guest/ResetPassword";
import ForgotPassword from "@/pages/guest/ForgotPassword";

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
      {
        path: "/guest/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/guest/reset-password",
        element: <ResetPassword />,
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
  {
    path: "/verify",
    element: <EmailVerificationLayout />,
    children: [
      {
        path: "/verify",
        element: <EmailVerification />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
