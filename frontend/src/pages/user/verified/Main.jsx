import React from "react";
import MainSect from "@/components/custom/Messages section/MainSect";
import SideBar from "@/components/custom/sidebar/SideBar";

export default function Main() {
  return (
    <main className="min-h-screen max-h-screen overflow-hidden select-none w-full md:w-[90%] mx-auto lg:w-[80%] flex md:py-4">
      <SideBar />
      <MainSect />
    </main>
  );
}
