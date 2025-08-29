import React, { useEffect, useState } from "react";
import MessageHeader from "./MessageHeader";
import Messages from "./Messages";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaPaperPlane } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { messageSchema } from "../../schemas/schemas";
import { useMainContext } from "../../contexts/MainContext";
import { Client } from "../../axios/axios";

export default function MessageSect() {
  const { user, token, conversationId, conversationObject } = useMainContext();
  const [messages, setMessages] = useState([]);

  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (data) => {
    const tempId = Date.now();

    const payload = {
      id: tempId,
      content: data.message,
      sender: user,
      conversation_id: conversationId,
      created_at: null,
    };

    form.reset({ message: "" });
    try {
      setMessages((prev) => [payload, ...prev]);

      const response = await Client.post(`/api/messages`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessages((prev) =>
        prev.map((msg) => (msg.id == tempId ? { ...response.data } : msg))
      );
    } catch (err) {
      console.error(err.message);
    } finally {
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await Client.get(
        `/api/conversations/${conversationId}/messages`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(response.data.data);
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
      <Messages messages={messages.length && messages} />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-fit flex items-end justify-center gap-3.5 p-2 bg-accent"
      >
        <Textarea
          className={"min-h-10 max-w-55 md:max-w-120 resize-none"}
          maxLength={255}
          placeholder="Type here..."
          {...form.register("message")}
        />
        <Button
          className={
            "h-10 rounded-full active:scale-95 cursor-pointer transition-all"
          }
        >
          <FaPaperPlane />
        </Button>
      </form>
    </main>
  );
}
