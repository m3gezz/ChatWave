import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { useMainContext } from "../../contexts/MainContext";

export default function SideBarHeader() {
  const [loading, setLoading] = useState(false);
  const { user, token } = useMainContext();

  // const initial = user.username.charAt(0).toUpperCase();

  return (
    <header className="h-18 flex items-center border-b-2 md:justify-between md:px-4.5 justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className={"w-10 h-10"}>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className={"border-2"}>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start" sideOffset={8}>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link className="w-full" to={"/user/profile"}>
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button
              variant={"destructive"}
              disabled={loading}
              className="w-full"
            >
              {loading ? <Spinner /> : "Log Out"}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="hidden md:block">amine</span>
    </header>
  );
}
