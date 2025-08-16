import React, { useEffect, useState } from "react";
import Conversation from "./Conversation";
import { useMainContext } from "../../contexts/MainContext";
import { Client } from "../../axios/axios";
import Spinner from "../animations/Spinner";

export default function Conversations() {
  const { token } = useMainContext();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchConversations = async () => {
    setLoading(true);

    try {
      const response = await Client.get(`/api/conversations`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setConversations(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <main className="space-y-2 p-2">
      {loading ? (
        <Spinner />
      ) : conversations ? (
        conversations.map((conversation) => (
          <Conversation key={conversation.id} conversation={conversation} />
        ))
      ) : (
        "No conversations found"
      )}
    </main>
  );
}
