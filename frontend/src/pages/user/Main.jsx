import React from "react";
import SideBar from "../../components/custom/SideBar";
import MainSect from "../../components/custom/MainSect";
import { useMainContext } from "../../contexts/MainContext";
import { Navigate } from "react-router-dom";

export default function Main() {
  const { user, token } = useMainContext();
  if (token && !user.email_verified_at) {
    return <Navigate to={"/user/profile"} />;
  }
  return (
    <main className="min-h-screen select-none w-full md:w-[90%] mx-auto lg:w-[80%] flex md:py-4">
      <SideBar />
      <MainSect />
    </main>
  );
}
