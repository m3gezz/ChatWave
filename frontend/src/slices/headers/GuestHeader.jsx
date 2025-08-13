import React from "react";

export default function GuestHeader() {
  return (
    <header className="text-center sm:w-[60%] md:w-[50%] lg:w-[40%] text-2xl">
      Welcome to <span className="font-medium text-green-300">ChatWave</span>{" "}
      your space to stay in touch. Sign in or up and start chatting!
    </header>
  );
}
