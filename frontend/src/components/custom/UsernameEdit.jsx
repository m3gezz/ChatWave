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

export default function UsernameEdit() {
  const { user } = useMainContext();
  const form = useForm({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: user.username,
    },
  });
  const username = form.watch("username");
  const handleOnSubmit = (data) => {
    console.log(data);
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
          <Button type="submit" disabled={username.trim() === user.username}>
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
