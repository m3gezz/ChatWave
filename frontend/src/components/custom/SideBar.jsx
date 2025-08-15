import React from "react";
import SideBarHeader from "./SideBarHeader";
import Conversations from "./Conversations";

export default function SideBar() {
  return (
    <aside className="md:max-w-80  border-y-2 max-w-26 border-l-2 lg:w-100 rounded-bl-md rounded-tl-md">
      <SideBarHeader />
      <Conversations />
    </aside>
  );
}
