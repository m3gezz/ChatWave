import React, { useEffect, useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMainContext } from "../../contexts/MainContext";
import { Client } from "../../axios/axios";
import Spinner from "../animations/Spinner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { membersEditSchema } from "../../schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

export default function Members() {
  const { user, token, conversationObject, handleCurrentConversation } =
    useMainContext();
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modify, setModify] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(membersEditSchema),
    defaultValues: {
      members: [],
    },
  });

  const onSubmit = async (data) => {
    const originalMembers = conversationObject.members.map(
      (member) => member.id
    );
    const members = data.members.map(Number);
    if (arraysEqualUnordered(originalMembers, members)) return;
    data.members = [user.id, ...members];

    setLoading(true);
    try {
      const response = await Client.patch(
        `/api/conversations/${conversationObject.id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
                className="flex bg-accent items-center justify-start gap-2.5 p-2 rounded-md hover:bg-accent-foreground hover:text-muted-foreground active:scale-95 transition-all"
              >
                <Input
                  id={user.id}
                  value={user.id}
                  type="checkbox"
                  className="w-fit"
                  {...form.register("members")}
                  defaultChecked={conversationObject.members.some(
                    (m) => m.id === user.id
                  )}
                />
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className={"border-2"}>
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {user.username}
              </Label>
            ))}
            <Button disabled={loading || !users.length} className={"w-full"}>
              {loading ? <Spinner /> : "Modify"}
            </Button>
          </form>
        ) : (
          <main className="flex flex-col gap-2.5">
            {[user, ...conversationObject.members].map((member) => (
              <div
                key={member.id}
                className="relative flex bg-accent items-center justify-start gap-2.5 p-2 rounded-md hover:bg-accent-foreground hover:text-muted-foreground transition-all"
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
                    <small className="font-bold absolute top-5 right-5">
                      admin
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
                  Modify members ?
                </Button>
              )}
          </main>
        )}
      </DialogHeader>
    </DialogContent>
  );
}
