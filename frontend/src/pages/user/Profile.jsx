import React from "react";
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

export default function Profile() {
  const { user } = useMainContext();

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
                  Choose an avatar that suits you.
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
                <CardDescription>{user.email}</CardDescription>
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
