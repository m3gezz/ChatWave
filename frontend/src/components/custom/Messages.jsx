import React, { useEffect, useRef } from "react";
import Message from "./Message";
import Spinner from "../animations/Spinner";

export default function Messages({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="flex flex-col flex-1 py-5 gap-0.5 overflow-y-scroll">
      {messages.length ? (
        messages.map((message, index) => (
          <Message message={message} key={index} />
        ))
      ) : (
        <div className="h-1/2 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      <div ref={bottomRef} />
    </main>
  );
}
