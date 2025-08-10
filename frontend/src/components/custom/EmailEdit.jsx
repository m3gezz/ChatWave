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

export default function EmailEdit() {
  const { user } = useMainContext();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: user.email,
    },
  });

  const handleOnSubmit = (data) => {
    console.log(data);
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
          <Button type="submit" disabled={!form.formState.isDirty || loading}>
            {loading ? <Spinner /> : "Save changes"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
