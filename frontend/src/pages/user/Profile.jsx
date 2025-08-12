import React, { useEffect, useState } from "react";
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
import AccountDelete from "../../components/custom/AccountDelete";
import Spinner from "../../components/animations/Spinner";
import { Client } from "../../axios/axios";

export default function Profile() {
  const { user, token, handleUser, handleToken } = useMainContext();
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const initial = user.username.charAt(0).toUpperCase();

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await Client.post(
        "/api/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      handleUser({});
      handleToken(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col gap-10 min-h-screen select-none justify-center items-center">
      <h1 className="text-xl font-bold text-center w-full">
        {user.email_verified_at ? (
          <p>
            Trying to <span className="text-green-300">modify</span> your
            profile huh. <br /> have fun!
          </p>
        ) : (
          <>
            <p>
              Please<span className="text-green-300"> verify</span> your email
              first to get
              <span className="text-green-300"> full access</span>.<br />
              check your email!
              <span className="text-sm block text-green-700">
                If you verified your email refresh this page
              </span>
            </p>
          </>
        )}
      </h1>
      <FadIn>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Here you can modify any information about you.
            </CardDescription>
            <CardAction>
              {user.email_verified_at ? (
                <Button>
                  <Link to={"/user"}>Go Home</Link>
                </Button>
              ) : (
                <Button onClick={handleLogout} disabled={loading}>
                  {loading ? <Spinner /> : "Log Out"}
                </Button>
              )}
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
                  <Button
                    variant="outline"
                    className={"w-34"}
                    disabled={!user.email_verified_at}
                  >
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
                  <Button
                    variant="outline"
                    className={"w-34"}
                    disabled={!user.email_verified_at}
                  >
                    Change username
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
              <div className="flex flex-col gap-2.5">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className={"w-34"}
                      disabled={!user.email_verified_at}
                    >
                      Change email
                    </Button>
                  </DialogTrigger>
                  <EmailEdit />
                </Dialog>
                {!user.email_verified_at && (
                  <Button
                    disabled={countdown > 0}
                    onClick={() => setCountdown(30)}
                  >
                    {countdown === 0 ? "Resend" : `Wait ${countdown}s`}
                  </Button>
                )}
              </div>
            </div>
            <div className="border rounded-md p-2 flex justify-between items-center gap-5">
              <div className="space-y-2.5">
                <CardTitle>Password</CardTitle>
                <CardDescription>*********</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className={"w-34"}
                    disabled={!user.email_verified_at}
                  >
                    Change password
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
                  <Button
                    variant="destructive"
                    className={"w-34"}
                    disabled={!user.email_verified_at}
                  >
                    Delete account
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
