import React, { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { avatars } from "@/data/groupAvatars";
import { useNavigate } from "react-router-dom";
import { useMainContext } from "@/contexts/MainContext";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/animations/Spinner";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { groupEditSchema } from "@/schemas/schemas";
import Error from "../utils/Error";
import { Client } from "@/axios/axios";

export default function GroupEdit() {
  const { token, conversationObject, handleCurrentConversation } =
    useMainContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(groupEditSchema),
    defaultValues: {
      title: conversationObject.title,
      avatar: conversationObject.avatar,
    },
  });
  const selectedAvatar = form.watch("avatar");

  const initial = conversationObject.title.charAt(0).toUpperCase();

  const handleOnSubmit = async (data) => {
    if (
      data.title.trim() === conversationObject.title &&
      conversationObject.avatar === selectedAvatar
    ) {
      form.setError("title", {
        type: "manual",
        message: "White spaces are not a change",
      });
      return;
    }

    setLoading(true);
    try {
      await Client.patch(`/api/conversations/${conversationObject.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleCurrentConversation(conversationObject.id);
      navigate("/guest");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent className={"select-none"}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <DialogHeader>
          <DialogTitle>Edit your group here</DialogTitle>
          <DialogDescription>change the avatar or the title.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2.5 py-2">
          <Label htmlFor="title">Group title</Label>
          <Input id="title" {...form.register("title")} />
          {form.formState.errors.title && (
            <Error>{form.formState.errors.title.message}</Error>
          )}
          <div className="flex flex-wrap justify-center items-center gap-3.5 py-3.5">
            {avatars.map((avatar, index) => (
              <div key={index}>
                <input
                  type="radio"
                  {...form.register("avatar")}
                  id={`avatar ${index}`}
                  className="hidden"
                  value={avatar}
                />
                <label htmlFor={`avatar ${index}`}>
                  <img
                    src={avatar}
                    alt={`AV ${index}`}
                    className={`cursor-pointer w-10 h-10 bg-foreground rounded-full ${
                      selectedAvatar == avatar &&
                      "border-3 border-muted-foreground"
                    }`}
                  />
                </label>
              </div>
            ))}
            <div>
              <input
                type="radio"
                {...form.register("avatar")}
                id={`no-avatar`}
                className="hidden"
                value={"none"}
              />
              <label
                htmlFor={`no-avatar`}
                className={`cursor-pointer flex items-center justify-center bg-foreground text-background w-10 h-10 rounded-full ${
                  selectedAvatar === "none" &&
                  "border-3 border-muted-foreground"
                }`}
              >
                {initial}
              </label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled={!form.formState.isDirty || loading}>
            {loading ? <Spinner /> : "Save changes"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
