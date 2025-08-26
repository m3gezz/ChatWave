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
import { passwordsSchema } from "../../schemas/schemas";
import Error from "./Error";
import { useState } from "react";
import Spinner from "../animations/Spinner";
import { Client } from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

export default function PasswordEdit() {
  const { user, token, handleUser } = useMainContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(passwordsSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });

  const handleOnSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await Client.patch(`/api/users/${user.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleUser(response.data);
      navigate("/user");
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
          <DialogTitle>Edit Password</DialogTitle>
          <DialogDescription>
            Make changes to your password here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2.5 py-2">
          <Label htmlFor="old_password">Old Password</Label>
          <Input
            type="password"
            id="old_password"
            {...form.register("old_password")}
            placeholder={"Old Password"}
          />
          {form.formState.errors.old_password && (
            <Error>{form.formState.errors.old_password.message}</Error>
          )}
        </div>
        <div className="space-y-2.5 py-2">
          <Label htmlFor="new_password">New Password</Label>
          <Input
            type="password"
            id="new_password"
            {...form.register("new_password")}
            placeholder={"New Password"}
          />
          {form.formState.errors.new_password && (
            <Error>{form.formState.errors.new_password.message}</Error>
          )}
        </div>
        <div className="space-y-2.5 py-2">
          <Label htmlFor="new_password_confirmation">
            Confirm New Password
          </Label>
          <Input
            type="password"
            id="new_password_confirmation"
            {...form.register("new_password_confirmation")}
            placeholder={"New Password Confirmation"}
          />
          {form.formState.errors.new_password_confirmation && (
            <Error>
              {form.formState.errors.new_password_confirmation.message}
            </Error>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled={loading}>
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
