import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useMainContext } from "../contexts/MainContext";

export default function GuestLayout() {
  const { user, token } = useMainContext();

  // if (token && user.admin) return <Navigate to={"/admin"} />;
  if (token && !user.admin && !user.email_verified_at)
    return <Navigate to={"/verify"} />;
  if (token && !user.admin) return <Navigate to={"/user"} />;

  return (
    <main className="flex min-h-screen justify-evenly items-center p-4">
      <Outlet />
    </main>
  );
}
