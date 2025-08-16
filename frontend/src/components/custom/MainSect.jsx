import React, { useEffect, useState } from "react";
import MainHeader from "./MainHeader";
import { useMainContext } from "../../contexts/MainContext";
import ConversationPlaceholder from "./ConversationPlaceholder";
import { Client } from "../../axios/axios";
import Spinner from "../animations/Spinner";

export default function MainSect() {
  const { token, conversationId } = useMainContext();
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchConversation = async () => {
    setLoading(true);

    try {
      const response = await Client.get(
        `/api/conversations/${conversationId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setConversation(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!conversationId) return;

    fetchConversation();
  }, [conversationId]);

  return (
    <main className="border-2 flex-1 rounded-br-md rounded-tr-md">
      {conversationId ? (
        loading ? (
          <div className="flex justify-center items-center h-[60%]">
            <Spinner />
          </div>
        ) : (
          <MainHeader conversation={conversation ?? {}} />
        )
      ) : (
        <ConversationPlaceholder />
      )}
    </main>
  );
}
