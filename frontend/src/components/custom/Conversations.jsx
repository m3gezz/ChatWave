import React, { useState } from "react";
import Conversation from "./Conversation";

const conversations = [
  {
    id: 11,
    title: "likan",
    group: true,
    avatar: "https://cdn.jsdelivr.net/gh/alohe/memojis/png/vibrent_1.png",
    members: [
      {
        id: 1,
        username: "amine",
        avatar: "https://cdn.jsdelivr.net/gh/alohe/memojis/png/vibrent_1.png",
      },
      {
        id: 2,
        username: "said",
        avatar: "https://cdn.jsdelivr.net/gh/alohe/memojis/png/vibrent_2.png",
      },
      {
        id: 3,
        username: "hicham",
        avatar: "https://cdn.jsdelivr.net/gh/alohe/memojis/png/vibrent_3.png",
      },
    ],
  },
  {
    id: 12,
    title: null,
    group: false,
    members: [
      {
        id: 1,
        username: "amine",
        avatar: "https://cdn.jsdelivr.net/gh/alohe/memojis/png/vibrent_1.png",
      },
      {
        id: 2,
        username: "said",
        avatar: "https://cdn.jsdelivr.net/gh/alohe/memojis/png/vibrent_2.png",
      },
    ],
  },
  {
    id: 13,
    title: null,
    group: false,
    members: [
      {
        id: 1,
        username: "amine",
        avatar: "https://cdn.jsdelivr.net/gh/alohe/memojis/png/vibrent_1.png",
      },
      {
        id: 3,
        username: "hicham",
        avatar: "https://cdn.jsdelivr.net/gh/alohe/memojis/png/vibrent_3.png",
      },
    ],
  },
];

export default function Conversations() {
  return (
    <main className="space-y-2 p-2">
      {conversations.map((conversation) => (
        <Conversation key={conversation.id} conversation={conversation} />
      ))}
    </main>
  );
}
