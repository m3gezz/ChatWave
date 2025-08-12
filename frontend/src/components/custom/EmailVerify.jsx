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
import { emailVerificationSchema } from "../../schemas/schemas";
import Error from "./Error";
import { useEffect, useState } from "react";
import Spinner from "../animations/Spinner";
import { Client } from "../../axios/axios";
import { useNavigate } from "react-router-dom";

export default function EmailVerify() {
  const { user, token, handleUser } = useMainContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      code: "",
    },
  });

  const sendCode = async () => {
    console.log("hi");
  };

  useEffect(() => {
    sendCode();
  }, []);

  const handleOnSubmit = async (data) => {
    // setLoading(true);
    // try {
    //   const response = await Client.patch(`/api/users/${user.id}`, data, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
    //   handleUser(response.data);
    //   navigate("/user");
    // } catch (err) {
    //   const errors = err.response?.data?.errors;

    //   if (errors) {
    //     Object.keys(errors).forEach((field) => {
    //       form.setError(field, {
    //         type: "server",
    //         message: errors[field][0],
    //       });
    //     });
    //   }
    // } finally {
    //   setLoading(false);
    // }
    console.log(data.code.toUpperCase());
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <DialogHeader>
          <DialogTitle>Verify your Email</DialogTitle>
          <DialogDescription>
            We sent a 5 digits code to your email. Enter it to verify your
            email. The code will expire in 10 minutes
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2.5 py-2">
          <Label htmlFor="code">Verifying Code</Label>
          <Input
            id="code"
            {...form.register("code")}
            placeholder="Enter code"
            maxLength={5}
            className={"text-lg text-center uppercase w-[50%] mx-auto my-2.5"}
          />
          {form.formState.errors.code && (
            <Error>{form.formState.errors.code.message}</Error>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="button" variant={"secondary"}>
            Resend
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? <Spinner /> : "Verify"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
