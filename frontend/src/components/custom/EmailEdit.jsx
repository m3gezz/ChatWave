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
import { emailSchema } from "../../schemas/schemas";
import Error from "./Error";
import { useState } from "react";
import Spinner from "./Spinner";
import { Client } from "../../axios/axios";
import { useNavigate } from "react-router-dom";

export default function EmailEdit() {
  const { user, token, handleUser } = useMainContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: user.email,
    },
  });
  const email = form.watch("email");

  const handleOnSubmit = async (data) => {
    setLoading(true);
    try {
      await Client.get("/sanctum/csrf-cookie");
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
          <DialogTitle>Edit Email</DialogTitle>
          <DialogDescription>
            Make changes to your email here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2.5 py-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...form.register("email")} />
          {form.formState.errors.email && (
            <Error>{form.formState.errors.email.message}</Error>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled={user.email === email || loading}>
            {loading ? <Spinner /> : "Save changes"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
