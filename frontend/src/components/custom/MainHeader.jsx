import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUserGroup } from "react-icons/fa6";

export default function MainHeader({ conversation }) {
  console.log(conversation);

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
    <header className="h-18 flex items-center border-b-2 px-4.5 justify-baseline gap-5">
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
      <span className="text-[10px] border-2 px-1 rounded-2xl">
        creator : {conversation.creator && conversation.creator[0].username}
      </span>
    </header>
  );
}
