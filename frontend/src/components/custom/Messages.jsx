import React, { useEffect, useRef } from "react";
import Message from "./Message";

export default function Messages({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="flex flex-col flex-1 py-5 gap-0.5 overflow-y-scroll">
      {messages.map((message, i) => (
        <Message message={message} key={i} />
      ))}
      <div ref={bottomRef} />
    </main>
  );
}
