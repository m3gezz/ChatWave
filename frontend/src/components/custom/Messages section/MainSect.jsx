import React, { useEffect, useState } from "react";
import { useMainContext } from "@/contexts/MainContext";
import ConversationPlaceholder from "../conversations/ConversationPlaceholder";
import { Client } from "@/axios/axios";
import Spinner from "@/components/animations/Spinner";
import MessageSect from "./MessageSect";

export default function MainSect() {
  const {
    token,
    conversationId,
    conversationObject,
    handleConversationObject,
  } = useMainContext();
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

      handleConversationObject(response.data);
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
    <main className="border-2 flex-1 flex flex-col rounded-br-md rounded-tr-md">
      {conversationId ? (
        loading ? (
          <div className="flex justify-center items-center h-[60%]">
            <Spinner />
          </div>
        ) : (
          <>
            <MessageSect />
          </>
        )
      ) : (
        <ConversationPlaceholder />
      )}
    </main>
  );
}
