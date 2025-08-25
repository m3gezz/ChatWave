import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUserGroup } from "react-icons/fa6";
import { FaEllipsisVertical } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMainContext } from "../../contexts/MainContext";

export default function MainHeader({ conversation }) {
  const { user } = useMainContext();
  let displayName = "";
  let avatar = "";
  let initial = "";

  if (conversation.group) {
    displayName = conversation.title ?? "Unnamed Group";
    avatar = conversation.avatar ?? "";
    initial = displayName.charAt(0).toUpperCase();
  } else if (conversation.members && conversation.members.length > 0) {
    const member = conversation.members[0];
    displayName = member.username ?? "Unknown User";
    avatar = member.avatar ?? "";
    initial = member.username?.charAt(0).toUpperCase() ?? "U";
  }

  return (
    <header className="h-18 flex relative items-center justify-between px-4 border-b-2">
      <div className="flex items-center gap-5">
        <div className="relative">
          <Avatar className={"w-10 h-10 "}>
            <AvatarImage src={avatar} />
            <AvatarFallback className={"border-2"}>{initial}</AvatarFallback>
          </Avatar>
          {conversation.group && (
            <FaUserGroup className="absolute bottom-0 right-0 text-foreground" />
          )}
        </div>
        <span>{displayName}</span>
      </div>
      <span className="text-sm opacity-80 absolute bottom-[-30px] border-2 rounded-sm px-2 left-[50%] translate-x-[-50%]">
        creator :{" "}
        {conversation.creator && conversation.creator[0].id === user.id
          ? "You"
          : conversation.creator && conversation.creator[0].username}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger className={"p-2 rounded-full"}>
          <FaEllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Chat Info</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {conversation.group ? (
            <>
              <DropdownMenuItem>members</DropdownMenuItem>
              {conversation.creator[0].id === user.id ? (
                <DropdownMenuItem>Edit</DropdownMenuItem>
              ) : (
                <DropdownMenuItem>Leave</DropdownMenuItem>
              )}
            </>
          ) : (
            <DropdownMenuItem>Block</DropdownMenuItem>
          )}
          {conversation.creator && conversation.creator[0].id === user.id && (
            <DropdownMenuItem>Delete permanently</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
