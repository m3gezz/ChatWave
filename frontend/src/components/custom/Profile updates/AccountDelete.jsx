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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMainContext } from "@/contexts/MainContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountDeletionSchema } from "@/schemas/schemas";
import Error from "../utils/Error";
import { useState } from "react";
import Spinner from "@/components/animations/Spinner";
import { Client } from "@/axios/axios";
import { FaTrash } from "react-icons/fa";

export default function AccountDelete() {
  const {
    user,
    token,
    handleUser,
    handleToken,
    handleCurrentConversation,
    handleConversationObject,
  } = useMainContext();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(accountDeletionSchema),
    defaultValues: {
      password: "",
    },
  });

  const handleOnSubmit = async (data) => {
    setLoading(true);
    try {
      await Client.post(
        `/api/users/${user.id}`,
        {
          _method: "DELETE",
          password: data.password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      handleUser({});
      handleToken(null);
      handleCurrentConversation(null);
      handleConversationObject({});
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
          <DialogTitle>Sure you want to delete this account</DialogTitle>
          <DialogDescription>
            Please enter the correct password to delete your account.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2.5 py-2">
          <Label htmlFor="password">Enter your password</Label>
          <Input
            id="password"
            type="password"
            {...form.register("password")}
            placeholder="Enter password"
          />
          {form.formState.errors.password && (
            <Error>{form.formState.errors.password.message}</Error>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" variant={"destructive"} disabled={loading}>
            {loading ? (
              <Spinner />
            ) : (
              <p className="flex items-center gap-1.5">
                <FaTrash /> Delete
              </p>
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
