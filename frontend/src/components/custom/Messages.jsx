import React from "react";
import { messages } from "../../data/messages";
import Message from "./Message";

export default function Messages() {
  return (
    <main className="flex flex-col flex-1 py-5 gap-1 overflow-y-scroll">
      {messages.map((message, i) => (
        <Message message={message} key={i} />
      ))}
    </main>
  );
}
