import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMainContext } from "../../contexts/MainContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameSchema } from "../../schemas/schemas";
import Error from "./Error";
import { useState } from "react";
import Spinner from "./Spinner";
import { Client } from "../../axios/axios";

export default function UsernameEdit() {
  const { user, token, handleUser } = useMainContext();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: user.username,
    },
  });
  const username = form.watch("username");

  const handleOnSubmit = async (data) => {
    setLoading(true);
    try {
      await Client.get("/sanctum/csrf-cookie");
      const response = await Client.patch(`/api/users/${user.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleUser(response.data);
    } catch (err) {
      const errors = err.response?.data?.errors;

      if (errors) {
        Object.keys(errors).forEach((field) => {
          form.setError(field, {
            type: "server",
            message: errors[field][0],
          });
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <DialogHeader>
          <DialogTitle>Edit Username</DialogTitle>
          <DialogDescription>
            Make changes to your username here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2.5 py-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" {...form.register("username")} />
          {form.formState.errors.username && (
            <Error>{form.formState.errors.username.message}</Error>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={username.trim() === user.username || loading}
          >
            {loading ? <Spinner /> : "Save changes"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
