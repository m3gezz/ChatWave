import React, { useState } from "react";
import Conversation from "./Conversation";

export default function Conversations() {
  return (
    <main className="space-y-2 p-2">
      {[0, 1, 2, 3, 4].map((conversation) => (
        <Conversation key={conversation} />
      ))}
    </main>
  );
}
