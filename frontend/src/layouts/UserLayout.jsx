import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useMainContext } from "@/contexts/MainContext";

export default function UserLayout() {
  const { user, token } = useMainContext();

  if (!token) return <Navigate to={"/guest"} />;
  if (token && !user.admin && !user.email_verified_at)
    return <Navigate to={"/verify"} />;
  // if (token && user.admin) return <Navigate to={"/admin"} />;

  return (
    <main>
      <Outlet />
    </main>
  );
}
