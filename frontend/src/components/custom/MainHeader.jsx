import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { conversations } from "../../data/conversations";
import { useMainContext } from "../../contexts/MainContext";

export default function MainHeader() {
  const { user, conversationId } = useMainContext();

  const selectedConversation = conversations.find(
    (conversation) => conversation.id == conversationId
  );

  let displayName = "User(s)";
  let avatar = "";
  let initial = "U(s)";

  if (selectedConversation.group) {
    displayName = selectedConversation.title;
    avatar = selectedConversation.avatar;
    initial = selectedConversation.title.charAt(0).toUpperCase();
  } else {
    const secondUser = selectedConversation.members.filter(
      (member) => member.id != user.id
    );
    displayName = secondUser[0].username;
    avatar = secondUser[0].avatar;
    initial = secondUser[0].username.charAt(0).toUpperCase();
  }

  return (
    <header className="h-18 flex items-center border-b-2 px-4.5 justify-baseline gap-5">
      <Avatar className={"w-10 h-10 "}>
        <AvatarImage src={avatar} />
        <AvatarFallback className={"border-2"}>{initial}</AvatarFallback>
      </Avatar>
      <span>{displayName}</span>
    </header>
  );
}
