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
import { useForm } from "react-hook-form";
import { useMainContext } from "../../contexts/MainContext";

export default function AvatarEdit() {
  const { user } = useMainContext();
  const form = useForm({ defaultValues: { avatar: user.avatar } });
  const selectedAvatar = form.watch("avatar");
  const initial = user.username.charAt(0).toUpperCase();
  const handleOnSubmit = (data) => {
    console.log(data);
  };

  return (
    <DialogContent className="sm:max-w-[425px] select-none">
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
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
                  {...form.register("avatar")}
                  id={`avatar ${index}`}
                  className="hidden"
                  value={avatar}
                />
                <label htmlFor={`avatar ${index}`}>
                  <img
                    src={avatar}
                    alt=""
                    className={`cursor-pointer w-10 h-10 rounded-full ${
                      selectedAvatar == avatar &&
                      "border-2 border-muted-foreground"
                    }`}
                  />
                </label>
              </div>
            ))}
            <div>
              <input
                type="radio"
                {...form.register("avatar")}
                id={`no-avatar`}
                className="hidden"
                value={""}
              />
              <label
                htmlFor={`no-avatar`}
                className={`cursor-pointer flex items-center justify-center bg-foreground text-background w-10 h-10 rounded-full ${
                  selectedAvatar == "" && "border-2 border-muted-foreground"
                }`}
              >
                {initial}
              </label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled={!form.formState.isDirty}>
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
