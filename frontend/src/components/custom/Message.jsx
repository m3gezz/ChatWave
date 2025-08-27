import React from "react";
import { useMainContext } from "../../contexts/MainContext";
import { FaCheck, FaRegClock } from "react-icons/fa6";

export default function Message({ message }) {
  const { user, conversationObject } = useMainContext();

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
      <div
        className={`${
          user.id == message.sender.id
            ? "bg-foreground text-background  rounded-tr-0 rounded-l-md rounded-br-md"
            : "bg-secondary text-foreground  rounded-tl-0 rounded-r-md  rounded-bl-md"
        }  px-3 py-2 flex font-medium items-center gap-3 text-wrap overflow-hidden truncate select-text`}
      >
        {message.content}
        <small className="flex items-center font-normal select-none text-muted-foreground gap-1 -mb-4 -mr-1">
          {message.created_at && message.created_at.slice(11, 16)}
          {user.id == message.sender.id &&
            (message.created_at ? (
              <FaCheck size={12} />
            ) : (
              <FaRegClock size={12} />
            ))}
        </small>
      </div>
    </div>
  );
}
