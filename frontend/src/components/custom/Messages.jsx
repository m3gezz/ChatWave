import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { FaDotCircle } from "react-icons/fa";

export default function Messages({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="flex flex-col flex-1 py-5 gap-0.5 overflow-y-scroll">
      {messages.length ? (
        [...messages]
          .reverse()
          .map((message) => <Message message={message} key={message.id} />)
      ) : (
        <div className="h-1/2 flex items-center justify-center text-center w-[90%] mx-auto">
          <div>
            Don't Be Shy And Say <strong>HI</strong> <br />
            <small className="flex items-center gap-1">
              If you have messages we are trying to get them.
              <div className="animate-bounce w-fit text-center">
                <FaDotCircle />
              </div>
            </small>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </main>
  );
}
