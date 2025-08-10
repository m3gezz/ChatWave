import React from "react";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { avatars } from "../../data/avatars";

export default function AvatarEdit() {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <form>
        <DialogHeader>
          <DialogTitle>Edit Avatar</DialogTitle>
          <DialogDescription>
            Make changes to your avatar here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2.5 py-2">
          <div className="flex justify-around items-center gap-3.5 py-3.5">
            {avatars.map((avatar, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name="avatar"
                  id={`avatar ${index}`}
                  className="hidden"
                />
                <label htmlFor={`avatar ${index}`}>
                  <img src={avatar} alt="" className="w-10 h-10 rounded-full" />
                </label>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
