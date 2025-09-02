import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaPaperPlane } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { messageSchema } from "@/schemas/schemas";
import { useMainContext } from "@/contexts/MainContext";
import { Client } from "@/axios/axios";

export default function MessageFooter() {
  const { user, token, conversationId, messages, handleMessages } =
    useMainContext();
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
    handleMessages([payload, ...messages]);
    try {
      const response = await Client.post(`/api/messages`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleMessages((prev) =>
        prev.map((msg) => (msg.id === tempId ? { ...response.data } : msg))
      );
    } catch (err) {
      console.error(err.message);
    } finally {
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="h-fit flex items-end justify-between lg:justify-center gap-3.5 p-2 bg-input"
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
  );
}
