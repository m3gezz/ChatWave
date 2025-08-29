import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaArrowRightFromBracket, FaUserGroup, FaX } from "react-icons/fa6";
import { FaEllipsisVertical } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMainContext } from "../../contexts/MainContext";
import Spinner from "../animations/Spinner";
import { Client } from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import Members from "./Members";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import GroupEdit from "./GroupEdit";
import { FaEdit } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

export default function MainHeader() {
  const {
    user,
    token,
    conversationObject,
    handleCurrentConversation,
    handleConversationObject,
  } = useMainContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLeave = async () => {
    setLoading(true);
    const members =
      conversationObject.members &&
      conversationObject.members.map((member) => member.id);
    const data = {
      members: members,
    };

    try {
      await Client.patch(`/api/conversations/${conversationObject.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleCurrentConversation(null);
      handleConversationObject({});
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
        `/api/conversations/${conversationObject.id}`,
        {
          _method: "DELETE",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      handleCurrentConversation(null);
      handleConversationObject({});
      navigate("/guest");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    handleCurrentConversation(null);
    handleConversationObject({});
  };

  let displayName = "";
  let avatar = "";
  let initial = "";

  if (conversationObject.group) {
    displayName = conversationObject.title ?? "Unnamed Group";
    avatar = conversationObject.avatar ?? "";
    initial = displayName.charAt(0).toUpperCase();
  } else if (
    conversationObject.members &&
    conversationObject.members.length > 0
  ) {
    const member = conversationObject.members[0];
    displayName = member.username ?? "Unknown User";
    avatar = member.avatar ?? "";
    initial = member.username?.charAt(0).toUpperCase() ?? "U";
  } else if (
    conversationObject.members &&
    conversationObject.members.length <= 0
  ) {
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
          {conversationObject.group && (
            <FaUserGroup className="absolute bottom-0 right-0 text-foreground" />
          )}
        </div>
        <strong>{displayName}</strong>
      </div>
      <span className="text-sm z-10 text-center opacity-60 bg-muted absolute bottom-[-50%] border-2 rounded-sm px-2 left-[50%] translate-x-[-50%]">
        created by :{" "}
        {conversationObject.creator &&
        conversationObject.creator[0].id === user.id
          ? "You"
          : conversationObject.creator &&
            conversationObject.creator[0].username}
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
          <DropdownMenuLabel className={"flex items-center gap-1.5"}>
            <FaComments /> Chat
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleClose}>
            <FaX /> Close
          </DropdownMenuItem>
          {conversationObject.group && (
            <>
              <Dialog>
                <DialogTrigger className={"w-full"}>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <FaUsers /> Members
                  </DropdownMenuItem>
                </DialogTrigger>
                <Members conversation={conversationObject} />
              </Dialog>
              {conversationObject.creator &&
                conversationObject.creator[0].id == user.id && (
                  <Dialog>
                    <DialogTrigger className={"w-full"}>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <FaEdit /> Edit
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <GroupEdit />
                  </Dialog>
                )}
            </>
          )}

          {conversationObject.creator &&
          conversationObject.creator[0].id === user.id ? (
            <DropdownMenuItem disabled={loading} onClick={handleDelete}>
              {loading ? (
                <Spinner />
              ) : (
                <p className="flex items-center gap-1.5">
                  <FaTrash /> Delete
                </p>
              )}
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem disabled={loading} onClick={handleLeave}>
              {loading ? (
                <Spinner />
              ) : (
                <p className="flex items-center gap-1.5">
                  <FaArrowRightFromBracket /> Leave
                </p>
              )}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
