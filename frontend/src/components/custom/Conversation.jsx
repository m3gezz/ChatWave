import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMainContext } from "../../contexts/MainContext";
import { FaUserGroup } from "react-icons/fa6";

export default function Conversation({ conversation }) {
  const { user, handleCurrentConversation } = useMainContext();

  let displayName = "User(s)";
  let avatar = "";
  let initial = "U(s)";

  if (conversation.group) {
    displayName = conversation.title;
    avatar = conversation.avatar;
    initial = conversation.title.charAt(0).toUpperCase();
  } else {
    const secondUser = conversation.members.filter(
      (member) => member.id != user.id
    );
    displayName = secondUser[0].username;
    avatar = secondUser[0].avatar;
    initial = secondUser[0].username.charAt(0).toUpperCase();
  }

  const handleClick = () => {
    handleCurrentConversation(conversation.id);
  };

  return (
    <main
      onClick={handleClick}
      className="flex flex-col text-center items-center md:flex-row border-1 hover:bg-accent active:scale-95 transition-all rounded-md py-2 px-3 gap-2.5"
    >
      <div className="relative">
        <Avatar className={"w-10 h-10 "}>
          <AvatarImage src={avatar} />
          <AvatarFallback className={"border-2"}>{initial}</AvatarFallback>
        </Avatar>
        {conversation.group && (
          <FaUserGroup className="absolute bottom-0 right-0 text-foreground" />
        )}
      </div>
      <span className="overflow-hidden whitespace-nowrap truncate w-full">
        {displayName}
      </span>
    </main>
  );
}
