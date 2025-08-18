import React, { useEffect, useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Client } from "../../axios/axios";
import { useMainContext } from "../../contexts/MainContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Spinner from "../animations/Spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Error from "./Error";
import { groupCreationSchema } from "../../schemas/schemas";
import { avatars } from "../../data/avatars";

export default function CreateGroup() {
  const { user, token } = useMainContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(groupCreationSchema),
    defaultValues: {
      title: "",
      members: [],
      avatar: "none",
    },
  });
  const selectedAvatar = form.watch("avatar");

  function onSubmit(data) {
    const members = data.members.map(Number);
    data.members = [user.id, ...members];
    data.group = true;

    console.log(data);
  }

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const response = await Client.get(`/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Choose the group members</DialogTitle>
        <DialogDescription>
          You will need a title and an avatar (optional), And at least one
          member excluding you.
        </DialogDescription>
      </DialogHeader>
      <form className="space-y-2.5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="title">Group Title</Label>
          <Input id="title" {...form.register("title")} />
          {form.formState.errors.title && (
            <Error>{form.formState.errors.title.message}</Error>
          )}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-3.5 py-3.5">
          {avatars.slice(0, 10).map((avatar, index) => (
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
                selectedAvatar === "none" && "border-3 border-muted-foreground"
              }`}
            ></label>
          </div>
        </div>
        <div className="space-y-2">
          {loading ? (
            <div className="mx-auto w-fit">
              <Spinner />
            </div>
          ) : users ? (
            users.map((user) => (
              <Label
                key={user.id}
                htmlFor={user.id}
                className="flex bg-accent items-center justify-start gap-2.5 p-2 rounded-md hover:bg-accent-foreground hover:text-accent active:scale-95 transition-all"
              >
                <Input
                  id={user.id}
                  value={user.id}
                  type="checkbox"
                  className="w-fit"
                  {...form.register("members")}
                />
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {user.username}
              </Label>
            ))
          ) : (
            "No users found"
          )}
        </div>
        {form.formState.errors.members && (
          <Error>{form.formState.errors.members.message}</Error>
        )}
        <Button disabled={loading} className={"w-full"}>
          Create
        </Button>
      </form>
    </DialogContent>
  );
}
