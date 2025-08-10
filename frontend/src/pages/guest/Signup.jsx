import React, { useState } from "react";
import FadIn from "../../components/animations/FadIn";
import { Link } from "react-router-dom";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { signupFormSchema } from "../../schemas/schemas";
import Spinner from "../../components/custom/Spinner";
import { Client } from "../../axios/axios";
import { useMainContext } from "../../contexts/MainContext";

export default function Signup() {
  const { handleUser, handleToken } = useMainContext();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await Client.get("/sanctum/csrf-cookie");
      const response = await Client.post("/api/register", data);
      handleUser(response.data.user);
      handleToken(response.data.token);
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
    <main className="max-w-150 w-full">
      <FadIn>
        <Card>
          <CardHeader>
            <CardTitle>Create a new account</CardTitle>
            <CardDescription>
              Fill the fields below to create to your account
            </CardDescription>
            <CardAction>
              <Button variant={"link"}>
                <Link to={"/guest"}>Sign In</Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@gamil.com" {...field} />
                      </FormControl>
                      <FormDescription>Enter your email.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="example123"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Enter your password.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password Confirmation</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="example123"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter your password confirmation.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={loading} className={"w-full"}>
                  {loading ? <Spinner /> : "Sign Up"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </FadIn>
    </main>
  );
}
