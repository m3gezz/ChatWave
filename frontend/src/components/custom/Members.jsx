import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Members({ members }) {
  return (
    <DialogContent className={"select-none"}>
      <DialogHeader>
        <DialogTitle>Members</DialogTitle>
        <DialogDescription>
          Those are the current members in this conversation.
        </DialogDescription>
        <main className="flex flex-col gap-2.5">
          {members.map((user) => (
            <div
              key={user.id}
              className="flex bg-accent items-center justify-start gap-2.5 p-2 rounded-md hover:bg-accent-foreground hover:text-muted-foreground transition-all"
            >
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback className={"border-2"}>
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <strong>{user.username}</strong>
                <small>{user.email}</small>
              </div>
            </div>
          ))}
        </main>
      </DialogHeader>
    </DialogContent>
  );
}
