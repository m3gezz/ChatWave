import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useMainContext } from "@/contexts/MainContext";

export default function EmailVerificationLayout() {
  const { user, token } = useMainContext();

  if (!token) return <Navigate to={"/guest"} />;
  if (token && user.email_verified_at) return <Navigate to={"/user"} />;

  return (
    <main className="flex items-center justify-center h-[100vh] p-2">
      <Outlet />
    </main>
  );
}
