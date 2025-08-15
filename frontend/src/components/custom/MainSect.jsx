import React from "react";
import MainHeader from "./MainHeader";
import { useMainContext } from "../../contexts/MainContext";
import ConversationPlaceholder from "./ConversationPlaceholder";

export default function MainSect() {
  const { conversationId } = useMainContext();
  return (
    <main className="border-2 flex-1 rounded-br-md rounded-tr-md">
      {conversationId ? <MainHeader /> : <ConversationPlaceholder />}
    </main>
  );
}
