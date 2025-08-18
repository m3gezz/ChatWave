import React from "react";
import SideBarHeader from "./SideBarHeader";
import Conversations from "./Conversations";
import SideBarFooter from "./SideBarFooter";

export default function SideBar() {
  return (
    <aside className="min-w-18 max-w-20 md:min-w-70 md:max-w-80 lg:min-w-90 lg:max-w-100 relative border-y-2  border-l-2 rounded-bl-md rounded-tl-md">
      <SideBarHeader />
      <Conversations />
      <SideBarFooter />
    </aside>
  );
}
