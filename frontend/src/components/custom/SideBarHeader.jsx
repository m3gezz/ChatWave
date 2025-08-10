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
import { Client } from "../../axios/axios";

export default function SideBarHeader() {
  const [loading, setLoading] = useState(false);
  const { user, token, handleUser, handleToken } = useMainContext();

  const initial = user.username.charAt(0).toUpperCase();

  const handleLogout = async () => {
    setLoading(true);

    try {
      await Client.get("/sanctum/csrf-cookie");
      await Client.post(
        "/api/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      handleUser({});
      handleToken(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="h-18 flex items-center border-b-2 md:justify-between md:px-4.5 justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger className={"cursor-pointer"}>
          <Avatar className={"w-10 h-10"}>
            <AvatarImage src={user.avatar} />
            <AvatarFallback className={"border-2"}>{initial}</AvatarFallback>
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
              className="w-full cursor-pointer"
              onClick={handleLogout}
            >
              {loading ? <Spinner /> : "Log Out"}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="hidden md:block font-bold text-xl text-shadow text-shadow-accent">
        {user.username}
      </span>
    </header>
  );
}
