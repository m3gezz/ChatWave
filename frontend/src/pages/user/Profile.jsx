import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FadIn from "../../components/animations/FadIn";
import { Link } from "react-router-dom";
import { useMainContext } from "../../contexts/MainContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UsernameEdit from "../../components/custom/UsernameEdit";
import PasswordEdit from "../../components/custom/PasswordEdit";
import EmailEdit from "../../components/custom/EmailEdit";
import AvatarEdit from "../../components/custom/AvatarEdit";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function Profile() {
  const { user } = useMainContext();
  const initial = user.username.charAt(0).toUpperCase();

  return (
    <main className="flex flex-col gap-10 min-h-screen select-none justify-center items-center">
      <h1 className="text-2xl font-bold text-center w-full">
        Trying to <span className="text-green-300">modify</span> your profile
        huh. <br /> have fun!
      </h1>
      <FadIn>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Here you can modify any information about you.
            </CardDescription>
            <CardAction>
              <Button>
                <Link to={"/user"}>Go Back</Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className={"space-y-5"}>
            <div className="border rounded-md p-2 flex justify-between items-center gap-5">
              <div className="space-y-2.5">
                <CardTitle>Avatar</CardTitle>
                <CardDescription>
                  <Avatar className={"w-10 h-10"}>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className={"border-2"}>
                      {initial}
                    </AvatarFallback>
                  </Avatar>
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className={"w-34"}>
                    Change avatar
                  </Button>
                </DialogTrigger>
                <AvatarEdit />
              </Dialog>
            </div>
            <div className="border rounded-md p-2 flex justify-between items-center gap-5">
              <div className="space-y-2.5">
                <CardTitle>Username</CardTitle>
                <CardDescription>{user.username}</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className={"w-34"}>
                    Change username
                  </Button>
                </DialogTrigger>
                <UsernameEdit />
              </Dialog>
            </div>
            <div className="border rounded-md p-2 flex justify-between items-center gap-5">
              <div className="space-y-2.5">
                <CardTitle>Email</CardTitle>
                <CardDescription className={"flex items-center gap-2"}>
                  {user.email}
                  {user.email_verified_at ? (
                    <div className="flex items-center gap-1 text-green-500">
                      Verified
                      <FaCheckCircle />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-red-500">
                      Unverified
                      <FaTimesCircle />
                    </div>
                  )}
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className={"w-34"}>
                    Change email
                  </Button>
                </DialogTrigger>
                <EmailEdit />
              </Dialog>
            </div>
            <div className="border rounded-md p-2 flex justify-between items-center gap-5">
              <div className="space-y-2.5">
                <CardTitle>Password</CardTitle>
                <CardDescription>*********</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className={"w-34"}>
                    Change password
                  </Button>
                </DialogTrigger>
                <PasswordEdit />
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </FadIn>
    </main>
  );
}
