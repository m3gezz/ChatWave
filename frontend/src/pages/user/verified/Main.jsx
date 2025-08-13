import React from "react";
import SideBar from "../../../components/custom/SideBar";
import MainSect from "../../../components/custom/MainSect";
import { useMainContext } from "../../../contexts/MainContext";

export default function Main() {
  const { user, token } = useMainContext();

  return (
    <main className="min-h-screen select-none w-full md:w-[90%] mx-auto lg:w-[80%] flex md:py-4">
      <SideBar />
      <MainSect />
    </main>
  );
}
