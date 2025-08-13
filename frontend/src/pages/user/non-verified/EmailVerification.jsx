import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FadIn from "../../../components/animations/FadIn";
import { useMainContext } from "../../../contexts/MainContext";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Spinner from "../../../components/animations/Spinner";
import { Client } from "../../../axios/axios";

export default function EmailVerification() {
  const [logLoading, setLogLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { user, token, handleUser, handleToken } = useMainContext();

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleLogout = async () => {
    setLogLoading(true);

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
      setLogLoading(false);
    }
  };

  const handleVerificationResend = async () => {
    setEmailLoading(true);

    try {
    } catch (err) {
    } finally {
      setEmailLoading(false);
      setCountdown(30);
    }
  };

  return (
    <FadIn>
      <Card className={"space-y-8 text-center select-none"}>
        <CardHeader className={"space-y-2"}>
          <CardTitle>Verify your email first to get full access</CardTitle>
          <CardDescription>
            We sent a verification message to this email, <br />
            {user.email}
            <br /> Please check your emails
          </CardDescription>
          <CardDescription>
            If you have any problems, Please refresh the page or try again
            later.
          </CardDescription>
        </CardHeader>
        <CardContent
          className={
            " flex md:flex-row justify-evenly gap-3.5 flex-col-reverse"
          }
        >
          <Button
            onClick={handleLogout}
            disabled={logLoading}
            variant={"outline"}
          >
            {logLoading ? <Spinner /> : "Cancel verification"}
          </Button>
          <Button
            disabled={countdown > 0 || emailLoading}
            onClick={handleVerificationResend}
          >
            {emailLoading ? (
              <Spinner />
            ) : countdown > 0 ? (
              `Wait ${countdown}s`
            ) : (
              "Resend message"
            )}
          </Button>
        </CardContent>
      </Card>
    </FadIn>
  );
}
