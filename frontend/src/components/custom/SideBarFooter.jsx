import React from "react";
import { MdGroupAdd } from "react-icons/md";
import { HiUserAdd } from "react-icons/hi";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateConversation from "./CreateConversation";
import CreateGroup from "./CreateGroup";

export default function SideBarFooter() {
  return (
    <div className="flex flex-col w-full md:flex-row md:items-center bottom-2 gap-2 p-2 items-start justify-around absolute">
      <Dialog>
        <DialogTrigger
          className={
            "w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground hover:text-background active:scale-95 transition-all"
          }
        >
          <HiUserAdd className="w-5 h-5" />
        </DialogTrigger>
        <CreateConversation />
      </Dialog>
      <Dialog>
        <DialogTrigger
          className={
            "w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground hover:text-background active:scale-95 transition-all"
          }
        >
          <MdGroupAdd className="w-5 h-5" />
        </DialogTrigger>
        <CreateGroup />
      </Dialog>
    </div>
  );
}
