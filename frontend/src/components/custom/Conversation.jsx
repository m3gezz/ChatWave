import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMainContext } from "../../contexts/MainContext";
import { FaUserGroup } from "react-icons/fa6";

export default function Conversation({ conversation }) {
  const { conversationId, handleCurrentConversation } = useMainContext();

  let displayName = "";
  let avatar = "";
  let initial = "";

  if (conversation.group) {
    displayName = conversation.title ?? "Unnamed Group";
    avatar = conversation.avatar ?? "G";
    initial = displayName.charAt(0).toUpperCase();
  } else if (conversation.members && conversation.members.length > 0) {
    const member = conversation.members[0];
    displayName = member.username ?? "Unknown User";
    avatar = member.avatar ?? "U";
    initial = member.username?.charAt(0).toUpperCase() ?? "U";
  } else if (conversation.members && conversation.members.length <= 0) {
    displayName = "User Left";
    avatar = "U";
    initial = "U";
  }

  const handleClick = () => {
    handleCurrentConversation(conversation.id);
  };

  return (
    <main
      onClick={handleClick}
      className={`flex flex-col text-center items-center md:flex-row border-1 hover:bg-accent ${
        conversationId == conversation.id && "bg-accent"
      } active:scale-95 transition-all rounded-md py-2 px-3 gap-2.5`}
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
