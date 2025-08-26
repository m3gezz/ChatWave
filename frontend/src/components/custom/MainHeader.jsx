import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUserGroup } from "react-icons/fa6";
import { FaEllipsisVertical } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useMainContext } from "../../contexts/MainContext";
import Spinner from "../animations/Spinner";
import { Client } from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import Members from "./Members";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import GroupEdit from "./GroupEdit";

export default function MainHeader({ conversation }) {
  const { user, token, handleCurrentConversation } = useMainContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLeave = async () => {
    setLoading(true);
    const members =
      conversation.members && conversation.members.map((member) => member.id);
    const data = {
      members: members,
    };

    try {
      await Client.patch(`/api/conversations/${conversation.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleCurrentConversation(null);
      navigate("/guest");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);

    try {
      await Client.post(
        `/api/conversations/${conversation.id}`,
        {
          _method: "DELETE",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      handleCurrentConversation(null);
      navigate("/guest");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  let displayName = "";
  let avatar = "";
  let initial = "";

  if (conversation.group) {
    displayName = conversation.title ?? "Unnamed Group";
    avatar = conversation.avatar ?? "";
    initial = displayName.charAt(0).toUpperCase();
  } else if (conversation.members && conversation.members.length > 0) {
    const member = conversation.members[0];
    displayName = member.username ?? "Unknown User";
    avatar = member.avatar ?? "";
    initial = member.username?.charAt(0).toUpperCase() ?? "U";
  } else if (conversation.members && conversation.members.length <= 0) {
    displayName = "User Left";
    avatar = "U";
    initial = "U";
  }

  return (
    <header className="h-18 flex relative items-center justify-between px-4 border-b-2">
      <div className="flex items-center gap-5">
        <div className="relative">
          <Avatar className={"w-10 h-10 "}>
            <AvatarImage src={avatar} />
            <AvatarFallback className={"border-2"}>{initial}</AvatarFallback>
          </Avatar>
          {conversation.group && (
            <FaUserGroup className="absolute bottom-0 right-0 text-foreground" />
          )}
        </div>
        <span>{displayName}</span>
      </div>
      <span className="text-sm text-center opacity-80 absolute bottom-[-70%] border-2 rounded-sm px-2 left-[50%] translate-x-[-50%]">
        created by :{" "}
        {conversation.creator && conversation.creator[0].id === user.id
          ? "You"
          : conversation.creator && conversation.creator[0].username}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={
            "p-2.5 rounded-full cursor-pointer hover:bg-accent transition-all"
          }
        >
          <FaEllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Chat</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {conversation.group && (
            <>
              <Dialog>
                <DialogTrigger className={"w-full"}>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    members
                  </DropdownMenuItem>
                </DialogTrigger>
                <Members members={[user, ...conversation.members]} />
              </Dialog>
              {conversation.creator[0].id == user.id && (
                <Dialog>
                  <DialogTrigger className={"w-full"}>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      Edit
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <GroupEdit conversation={conversation} />
                </Dialog>
              )}
            </>
          )}

          {conversation.creator && conversation.creator[0].id === user.id ? (
            <DropdownMenuItem>
              <Button
                variant={"destructive"}
                disabled={loading}
                className="w-full cursor-pointer"
                onClick={handleDelete}
              >
                {loading ? <Spinner /> : "Delete"}
              </Button>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem>
              <Button
                variant={"destructive"}
                disabled={loading}
                className="w-full cursor-pointer"
                onClick={handleLeave}
              >
                {loading ? <Spinner /> : "Leave"}
              </Button>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
