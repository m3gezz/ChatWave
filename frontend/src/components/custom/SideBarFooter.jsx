import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {} from "react-icons/fa6";
import { MdGroupAdd } from "react-icons/md";
import { HiUserAdd } from "react-icons/hi";

export default function SideBarFooter() {
  return (
    <div className="flex flex-col w-full md:flex-row md:items-center bottom-2 gap-2 p-2 items-start justify-around absolute">
      <Link
        className={
          "w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground hover:text-background active:scale-95 transition-all"
        }
      >
        <HiUserAdd className="w-5 h-5" />
      </Link>
      <Link
        className={
          "w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground hover:text-background active:scale-95 transition-all"
        }
      >
        <MdGroupAdd className="w-5 h-5" />
      </Link>
    </div>
  );
}
