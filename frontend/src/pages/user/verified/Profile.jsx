import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FadIn from "@/components/animations/FadIn";
import { Link } from "react-router-dom";
import { useMainContext } from "@/contexts/MainContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UsernameEdit from "@/components/custom/Profile updates/UsernameEdit";
import PasswordEdit from "@/components/custom/Profile updates/PasswordEdit";
import EmailEdit from "@/components/custom/Profile updates/EmailEdit";
import AvatarEdit from "@/components/custom/Profile updates/AvatarEdit";
import { FaCheckCircle, FaHome, FaPen, FaTrash } from "react-icons/fa";
import AccountDelete from "@/components/custom/Profile updates/AccountDelete";

export default function Profile() {
  const { user } = useMainContext();

  const initial = user.username.charAt(0).toUpperCase();

  return (
    <main className="flex flex-col gap-10 p-2 min-h-screen select-none justify-center items-center">
      <h1 className="text-xl font-bold text-center w-full">
        Trying to modify your profile. <br /> Have fun!
      </h1>
      <FadIn>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Here you can modify any information about you.
            </CardDescription>
            <CardAction>
              <Link to={"/user"}>
                <Button>
                  <FaHome /> Home
                </Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent className={"space-y-5"}>
            <div className="border rounded-md p-2 flex justify-between items-center gap-5">
              <div className="space-y-2.5">
                <CardTitle>Avatar</CardTitle>
                <CardDescription>
                  <Avatar className={"w-10 h-10"}>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className={"border-2 bg-muted"}>
                      {initial}
                    </AvatarFallback>
                  </Avatar>
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className={"w-34"}>
                    <FaPen />
                    Edit
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
                    <FaPen />
                    Edit
                  </Button>
                </DialogTrigger>
                <UsernameEdit />
              </Dialog>
            </div>
            <div className="border rounded-md p-2 flex justify-between items-center gap-5">
              <div className="space-y-2.5">
                <CardTitle>Email</CardTitle>
                <CardDescription
                  className={"flex flex-wrap items-center gap-2"}
                >
                  {user.email}
                  <div className="flex items-center gap-1 text-green-500">
                    Verified
                    <FaCheckCircle />
                  </div>
                </CardDescription>
              </div>
              <div className="flex flex-col gap-2.5">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className={"w-34"}>
                      <FaPen />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <EmailEdit />
                </Dialog>
              </div>
            </div>
            <div className="border rounded-md p-2 flex justify-between items-center gap-5">
              <div className="space-y-2.5">
                <CardTitle>Password</CardTitle>
                <CardDescription>*********</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className={"w-34"}>
                    <FaPen />
                    Edit
                  </Button>
                </DialogTrigger>
                <PasswordEdit />
              </Dialog>
            </div>
            <div className="border rounded-md p-2 flex justify-between items-center gap-5">
              <div className="space-y-2.5">
                <CardTitle>Delete your account</CardTitle>
                <CardDescription>
                  This will delete your account permanently
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" className={"w-34"}>
                    <FaTrash /> Delete
                  </Button>
                </DialogTrigger>
                <AccountDelete />
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </FadIn>
    </main>
  );
}
