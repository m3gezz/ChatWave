import React from "react";
import MessageHeader from "./MessageHeader";
import Messages from "./Messages";
import MessageFooter from "./MessageFooter";

export default function MessageSect() {
  return (
    <main className="flex-1 max-h-screen overflow-scroll flex flex-col justify-between">
      <MessageHeader />
      <Messages />
      <MessageFooter />
    </main>
  );
}
