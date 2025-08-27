import React, { useEffect, useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMainContext } from "../../contexts/MainContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { conversationCreationSchema } from "../../schemas/schemas";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Client } from "../../axios/axios";
import Spinner from "../animations/Spinner";
import Error from "./Error";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

export default function CreateConversation() {
  const { user, token, handleCurrentConversation } = useMainContext();
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(conversationCreationSchema),
    defaultValues: {
      members: null,
    },
  });

  const selectedMember = form.watch("members");
  console.log(selectedMember);

  const onSubmit = async (data) => {
    data.members = [user.id, Number(data.members)];
    data.group = false;

    setLoading(true);
    try {
      const response = await Client.post(`/api/conversations`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      handleCurrentConversation(response.data.id);
      navigate("/guest");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setUsersLoading(true);

    try {
      const response = await Client.get(`/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Choose a member to chat with</DialogTitle>
        <DialogDescription>
          The moment you create a conversation a greeting message will be sent
          to that member.
        </DialogDescription>
      </DialogHeader>
      <form className="space-y-2.5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          {usersLoading ? (
            <div className="mx-auto w-fit">
              <Spinner />
            </div>
          ) : users.length ? (
            users.map((user) => (
              <Label
                key={user.id}
                htmlFor={user.id}
                className={`flex items-center justify-start gap-2.5 ${
                  selectedMember == user.id
                    ? "bg-foreground text-muted-foreground"
                    : "bg-accent"
                } p-2 rounded-md hover:bg-accent-foreground hover:text-muted active:scale-95 relative transition-all`}
              >
                <Input
                  id={user.id}
                  value={user.id}
                  type="radio"
                  className="w-fit"
                  {...form.register("members")}
                  hidden
                />
                <Avatar
                  className={`${selectedMember == user.id && "opacity-50"}`}
                >
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className={"border-2"}>
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{user.username}</span>
                {selectedMember == user.id && (
                  <FaCheck className="absolute right-4" />
                )}
              </Label>
            ))
          ) : (
            <p className="text-center">No users found</p>
          )}
        </div>
        {form.formState.errors.members && (
          <Error>{form.formState.errors.members.message}</Error>
        )}
        <Button disabled={loading || !users.length} className={"w-full"}>
          {loading ? <Spinner /> : "Create"}
        </Button>
      </form>
    </DialogContent>
  );
}
