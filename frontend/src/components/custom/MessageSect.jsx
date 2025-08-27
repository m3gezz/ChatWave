import React, { useState } from "react";
import MessageHeader from "./MessageHeader";
import Messages from "./Messages";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaPaperPlane } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { messageSchema } from "../../schemas/schemas";
import { messages as data } from "../../data/messages";
import { useMainContext } from "../../contexts/MainContext";

export default function MessageSect() {
  const { user } = useMainContext();
  const [messages, setMessages] = useState(data);

  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (data) => {
    const payload = {
      content: data.message,
      sender: {
        id: user.id,
        username: user.username,
      },
      date: 3,
    };
    setMessages((prev) => [...prev, payload]);
    form.reset({ message: "" });
  };

  return (
    <main className="flex-1 max-h-screen overflow-scroll flex flex-col justify-between">
      <MessageHeader />
      <Messages messages={messages} />
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
