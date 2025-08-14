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
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";

export default function EmailVerification() {
  const [logLoading, setLogLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [message, setMessage] = useState("");
  const { user, token, handleUser, handleToken } = useMainContext();

  const disable = message === "Already verified refresh the page";

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
      const response = await Client.post(
        "/api/email/verification-notification",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(response.data.message);
    } catch (err) {
      console.error(err);
    } finally {
      setEmailLoading(false);
      setCountdown(30);
    }
  };

  const fetchUser = async () => {
    setEmailLoading(true);
    setLogLoading(true);

    try {
      const response = await Client.get(`/api/users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      handleUser(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setEmailLoading(false);
      setLogLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <FadIn>
      <Card className={"space-y-2 text-center select-none"}>
        <CardHeader className={"space-y-2"}>
          <CardTitle className={"flex items-center justify-center gap-2.5"}>
            Verify your email first to continue
            <FaRegCheckCircle className="text-green-500" />
          </CardTitle>
          <CardDescription>
            Click Send to get a verification message in {user.email}.<br />{" "}
            Please check your emails
          </CardDescription>
          <CardDescription>
            {message && <p className="text-green-700">{message}</p>}
          </CardDescription>
        </CardHeader>
        <CardContent
          className={"flex md:flex-row justify-evenly gap-3.5 flex-col-reverse"}
        >
          <Button
            onClick={handleLogout}
            disabled={logLoading || disable}
            variant={"outline"}
          >
            {logLoading ? (
              <Spinner />
            ) : (
              <div className="flex items-center justify-center gap-2.5">
                Cancel verification{" "}
                <FaRegTimesCircle className="text-destructive" />
              </div>
            )}
          </Button>
          <Button
            disabled={countdown > 0 || emailLoading || disable}
            onClick={handleVerificationResend}
          >
            {emailLoading ? (
              <Spinner />
            ) : countdown > 0 ? (
              `Wait ${countdown}s to use again`
            ) : (
              "Send verification message"
            )}
          </Button>
        </CardContent>
      </Card>
    </FadIn>
  );
}
