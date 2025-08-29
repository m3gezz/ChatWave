import React, { useState } from "react";
import { useMainContext } from "../../contexts/MainContext";
import {
  FaCheck,
  FaPen,
  FaRegClock,
  FaTrash,
  FaTrashArrowUp,
  FaX,
} from "react-icons/fa6";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Client } from "../../axios/axios";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { messageSchema } from "../../schemas/schemas";

export default function Message({ message }) {
  const { user, token, conversationObject, handleMessages } = useMainContext();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: message.content,
    },
  });

  const handleEdit = async (data) => {
    setLoading(true);
    const payload = { content: data.message };
    try {
      const response = await Client.patch(
        `/api/messages/${message.id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      handleMessages((prev) =>
        prev.map((msg) =>
          msg.id === response.data.id ? { ...response.data } : msg
        )
      );
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
      setEditing(false);
    }
  };

  const handleDeleteMe = async () => {
    setLoading(true);
    const data = { content: "Message deleted" };
    try {
      const response = await Client.patch(`/api/messages/${message.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      handleMessages((prev) =>
        prev.map((msg) =>
          msg.id === response.data.id ? { ...response.data } : msg
        )
      );
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAll = async () => {
    setLoading(true);
    try {
      await Client.delete(`/api/messages/${message.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      handleMessages((prev) => prev.filter((msg) => msg.id != message.id));
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        user.id == message.sender.id && "self-end "
      } flex flex-col gap-1 w-fit px-2 max-w-[70%]`}
    >
      <small
        className={`${user.id == message.sender.id && "self-end"} ${
          !conversationObject.group && "hidden"
        } text-muted-foreground`}
      >
        {message.sender.id == user.id ? "You" : message.sender.username}
      </small>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className={`${
              user.id == message.sender.id
                ? "bg-foreground text-background  rounded-tr-0 rounded-l-md rounded-br-md"
                : "bg-secondary text-foreground  rounded-tl-0 rounded-r-md  rounded-bl-md"
            }  px-3 py-2 flex font-medium items-center gap-3 text-wrap overflow-hidden truncate select-text`}
          >
            {editing ? (
              <form
                onSubmit={form.handleSubmit(handleEdit)}
                className="flex flex-col gap-1 items-center justify-center"
              >
                <Textarea
                  className={`min-h-10 w-35 md:w-55 lg:w-75 resize-none `}
                  maxLength={255}
                  placeholder="Type here..."
                  {...form.register("message")}
                />
                <div className="flex gap-1 items-center justify-between w-full px-4">
                  <Button type="submit" disabled={loading}>
                    <FaCheck />
                  </Button>
                  <Button
                    disabled={loading}
                    type="button"
                    onClick={() => {
                      setEditing(false);
                    }}
                  >
                    <FaX />
                  </Button>
                </div>
              </form>
            ) : (
              message.content
            )}
            {!editing && (
              <small className="flex items-center font-normal select-none text-muted-foreground gap-1 -mb-4 -mr-1">
                {message.updated_at != message.created_at &&
                  message.content != "Message deleted" && <span>edited</span>}
                {message.created_at && message.created_at.slice(11, 16)}
                {user.id == message.sender.id &&
                  (message.created_at && !loading ? (
                    <FaCheck size={12} />
                  ) : (
                    <FaRegClock size={12} />
                  ))}
              </small>
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          {!(message.content === "Message deleted") && (
            <>
              <ContextMenuItem disabled={loading} onClick={handleDeleteMe}>
                <FaTrash />
                Delete
              </ContextMenuItem>
              <ContextMenuItem
                disabled={loading}
                onClick={() => {
                  setEditing(!editing);
                }}
              >
                <FaPen />
                Edit
              </ContextMenuItem>
            </>
          )}
          <ContextMenuItem disabled={loading} onClick={handleDeleteAll}>
            <FaTrashArrowUp />
            Delete permanently
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
