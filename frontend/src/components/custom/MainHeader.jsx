import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MainHeader() {
  return (
    <header className="h-18 flex items-center border-b-2 px-4.5 justify-baseline gap-5">
      <Avatar className={"w-10 h-10 "}>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback className={"border-2"}>CN</AvatarFallback>
      </Avatar>
      <span>amine</span>
    </header>
  );
}
