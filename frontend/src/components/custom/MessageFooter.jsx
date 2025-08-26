import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaPaperPlane } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { messageSchema } from "../../schemas/schemas";

export default function MessageFooter() {
  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
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
  );
}
