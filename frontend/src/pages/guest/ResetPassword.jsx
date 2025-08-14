import React, { useEffect, useState } from "react";
import FadIn from "../../components/animations/FadIn";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "../../schemas/schemas";
import Spinner from "../../components/animations/Spinner";

export default function ResetPassword() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (!params.get("token") || !params.get("email"))
      return <Navigate to={"/guest/forgot-password"} />;

    setToken(params.get("token") || "");
    setEmail(params.get("email") || "");
  }, [location.search]);

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (data) => {
    data = { ...{ token: token, email: email }, ...data };
    console.log(data);
  };
  return (
    <FadIn>
      <Card>
        <CardHeader>
          <CardTitle>Forgot your password!</CardTitle>
          <CardDescription>
            Enter your email below so we can help you reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example123"
                        type={"password"}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Enter your new password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password Confirmation</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example123"
                        type={"password"}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Confirm your new password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-2.5 md:flex-row-reverse">
                <Button type="submit" disabled={loading}>
                  {loading ? <Spinner /> : "Save changes"}
                </Button>
                <Button variant={"secondary"} type={"button"}>
                  <Link to={"/guest"} className="w-full">
                    Cancel
                  </Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </FadIn>
  );
}
