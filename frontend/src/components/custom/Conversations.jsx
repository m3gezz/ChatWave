import React, { useState } from "react";
import Conversation from "./Conversation";
import { conversations } from "../../data/conversations";

export default function Conversations() {
  return (
    <main className="space-y-2 p-2">
      {conversations.map((conversation) => (
        <Conversation key={conversation.id} conversation={conversation} />
      ))}
    </main>
  );
}
