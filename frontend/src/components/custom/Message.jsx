import React from "react";
import { useMainContext } from "../../contexts/MainContext";

export default function Message({ message }) {
  const { user, conversationObject } = useMainContext();

  return (
    <div
      className={`${
        user.id == message.sender.id && "self-end"
      } flex flex-col gap-1 w-fit px-2 max-w-[70%]`}
    >
      <small
        className={`${user.id == message.sender.id && "self-end"} ${
          !conversationObject.group && "hidden"
        } text-muted-foreground`}
      >
        {message.sender.id == user.id ? "You" : message.sender.username}
      </small>
      <div
        className={`${
          user.id == message.sender.id
            ? "bg-foreground text-background"
            : "bg-secondary text-foreground"
        } rounded-lg px-3 py-2 text-wrap overflow-hidden truncate select-text`}
      >
        {message.content}
      </div>
    </div>
  );
}
