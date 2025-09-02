import React, { useEffect, useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMainContext } from "@/contexts/MainContext";
import { Client } from "@/axios/axios";
import Spinner from "@/components/animations/Spinner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { membersEditSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaPen, FaUserTie } from "react-icons/fa";

export default function Members() {
  const { user, token, conversationObject, handleCurrentConversation } =
    useMainContext();
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modify, setModify] = useState(false);
  const navigate = useNavigate();

  const originalMembers = conversationObject.members.map((m) => String(m.id));

  const form = useForm({
    resolver: zodResolver(membersEditSchema),
    defaultValues: {
      members: originalMembers,
    },
  });

  const selectedMembers = form.watch("members");

  const onSubmit = async (data) => {
    const members = data.members.map(Number);
    data.members = [user.id, ...members];

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
    if (modify && users.length == 0) {
      fetchUsers();
    }
  }, [modify]);

  function arraysEqualUnordered(a, b) {
    return (
      a.length === b.length &&
      [...a].sort().every((val, i) => val === [...b].sort()[i])
    );
  }

  return (
    <DialogContent className={"select-none"}>
      <DialogHeader>
        <DialogTitle>Members</DialogTitle>
        <DialogDescription>
          Those are the current members in this conversation. You can change
          them if you are an admin.
        </DialogDescription>
        {usersLoading ? (
          <Spinner />
        ) : users.length ? (
          <form className="space-y-2.5" onSubmit={form.handleSubmit(onSubmit)}>
            {users.map((user) => (
              <Label
                key={user.id}
                htmlFor={user.id}
                className={`flex items-center justify-start gap-2.5 ${
                  selectedMembers.includes(String(user.id))
                    ? "bg-card-foreground text-card"
                    : "bg-muted"
                } p-2 rounded-md hover:bg-card-foreground hover:text-card active:scale-95 relative transition-all`}
              >
                <Input
                  id={user.id}
                  value={user.id}
                  type="checkbox"
                  className="w-fit"
                  {...form.register("members")}
                  hidden
                />
                <Avatar
                  className={`${
                    selectedMembers.includes(String(user.id)) && "opacity-50"
                  }`}
                >
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className={"border-2"}>
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{user.username}</span>
                {selectedMembers.includes(String(user.id)) && (
                  <FaCheck className="absolute right-4" />
                )}
              </Label>
            ))}
            <Button
              disabled={
                loading ||
                !users.length ||
                arraysEqualUnordered(selectedMembers, originalMembers)
              }
              className={"w-full"}
            >
              {loading ? (
                <Spinner />
              ) : (
                <p className="flex items-center gap-1.5">
                  <FaCheck /> Save
                </p>
              )}
            </Button>
          </form>
        ) : (
          <main className="flex flex-col gap-2.5">
            {[user, ...conversationObject.members].map((member) => (
              <div
                key={member.id}
                className="relative flex bg-muted items-center justify-start gap-2.5 p-2 rounded-md"
              >
                <Avatar>
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className={"border-2"}>
                    {member.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <strong>{member.username}</strong>
                  <small>{member.email}</small>
                </div>
                {conversationObject.creator &&
                  conversationObject.creator[0].id == member.id && (
                    <small className="flex items-center gap-1.5 font-bold absolute top-5 right-5">
                      <FaUserTie /> admin
                    </small>
                  )}
              </div>
            ))}
            {conversationObject.creator &&
              conversationObject.creator[0].id == user.id && (
                <Button
                  onClick={() => {
                    setModify(true);
                  }}
                >
                  <FaPen />
                  Modify
                </Button>
              )}
          </main>
        )}
      </DialogHeader>
    </DialogContent>
  );
}
