import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import GuestHeader from "../slices/headers/GuestHeader";
import { useMainContext } from "../contexts/MainContext";

export default function GuestLayout() {
  const { user, token } = useMainContext();

  // if (token && user.admin) return <Navigate to={"/admin"} />;
  if (token && !user.admin) return <Navigate to={"/user"} />;

  return (
    <main className="flex flex-col gap-5 min-h-screen justify-evenly items-center p-4">
      <GuestHeader />
      <Outlet />
    </main>
  );
}
