import React, { useEffect, useRef } from "react";
import Message from "./Message";

export default function Messages({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="flex flex-col flex-1 py-5 gap-0.5 overflow-y-scroll">
      {messages.length ? (
        messages.map((message) => (
          <Message message={message} key={message.id} />
        ))
      ) : (
        <div className="h-1/2 flex items-center justify-center text-center w-[90%] mx-auto">
          <p>
            Don't Be Shy And Say <strong>HI</strong> <br />
            <small>If you have messages we are trying to get them.</small>
          </p>
        </div>
      )}
      <div ref={bottomRef} />
    </main>
  );
}
