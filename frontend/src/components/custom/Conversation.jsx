import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Conversation() {
  return (
    <div className="h-18 flex items-center border-1 hover:bg-accent active:scale-95 transition-all rounded-md px-4.5 justify-baseline gap-5">
      <Avatar className={"w-10 h-10 "}>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback className={"border-2"}>CN</AvatarFallback>
      </Avatar>
      <span className="hidden md:block">amine</span>
    </div>
  );
}
