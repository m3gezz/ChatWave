import React, { useEffect } from "react";
import MessageHeader from "./MessageHeader";
import Messages from "./Messages";
import { useMainContext } from "../../contexts/MainContext";
import { Client } from "../../axios/axios";
import MessageFooter from "./MessageFooter";

export default function MessageSect() {
  const { token, conversationId, handleMessages } = useMainContext();

  const fetchMessages = async () => {
    try {
      const response = await Client.get(
        `/api/conversations/${conversationId}/messages`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      handleMessages(response.data.data);
    } catch (err) {
      console.error(err.message);
    } finally {
    }
  };

  useEffect(() => {
    if (!conversationId) return;
    fetchMessages();
  }, [conversationId]);

  return (
    <main className="flex-1 max-h-screen overflow-scroll flex flex-col justify-between">
      <MessageHeader />
      <Messages />
      <MessageFooter />
    </main>
  );
}
