import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { avatars } from "@/data/avatars";
import { useForm } from "react-hook-form";
import { useMainContext } from "@/contexts/MainContext";
import Spinner from "@/components/animations/Spinner";
import { Client } from "@/axios/axios";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

export default function AvatarEdit() {
  const { user, token, handleUser } = useMainContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({ defaultValues: { avatar: user.avatar } });
  const selectedAvatar = form.watch("avatar");

  const initial = user.username.charAt(0).toUpperCase();

  const handleOnSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await Client.patch(`/api/users/${user.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleUser(response.data);
      navigate("/user");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
          <div className="flex flex-wrap justify-center items-center gap-3.5 py-3.5">
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
                    alt={`AV ${index}`}
                    className={`cursor-pointer w-10 h-10 bg-foreground rounded-full ${
                      selectedAvatar == avatar &&
                      "border-3 border-muted-foreground"
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
                value={"none"}
              />
              <label
                htmlFor={`no-avatar`}
                className={`cursor-pointer flex items-center justify-center bg-muted text-muted-foreground w-10 h-10 rounded-full ${
                  selectedAvatar === "none" &&
                  "border-3 border-muted-foreground"
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
          <Button type="submit" disabled={!form.formState.isDirty || loading}>
            {loading ? (
              <Spinner />
            ) : (
              <p className="flex items-center gap-1.5">
                <FaCheck /> Save
              </p>
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
