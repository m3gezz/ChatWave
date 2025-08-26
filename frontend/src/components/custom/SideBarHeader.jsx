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
import { Link } from "react-router-dom";
import Spinner from "../animations/Spinner";
import { useMainContext } from "../../contexts/MainContext";
import { Client } from "../../axios/axios";
import { FaUser } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";

export default function SideBarHeader() {
  const [loading, setLoading] = useState(false);
  const {
    user,
    token,
    handleUser,
    handleToken,
    handleCurrentConversation,
    handleConversationObject,
  } = useMainContext();

  const initial = user.username.charAt(0).toUpperCase();

  const handleLogout = async () => {
    setLoading(true);

    try {
      await Client.post(
        "/api/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      handleUser({});
      handleToken(null);
      handleCurrentConversation(null);
      handleConversationObject({});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="h-18 flex items-center border-b-2 md:justify-between md:px-4.5 gap-2 justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger className={"cursor-pointer rounded-full"}>
          <Avatar className={"w-10 h-10"}>
            <AvatarImage src={user.avatar} />
            <AvatarFallback className={"border-2"}>{initial}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start" sideOffset={8}>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link className="w-full" to={"/user/profile"}>
            <DropdownMenuItem>
              <FaUser />
              Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled={loading} onClick={handleLogout}>
            {loading ? (
              <Spinner />
            ) : (
              <p className="flex items-center gap-1.5">
                {" "}
                <FaArrowRightFromBracket />
                Log Out
              </p>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="hidden md:block font-bold text-xl text-shadow text-shadow-accent">
        {user.username}
      </span>
    </header>
  );
}
