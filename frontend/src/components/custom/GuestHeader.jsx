import React from "react";

export default function GuestHeader() {
  return (
    <header className="text-center select-none mb-10 sm:w-[65%] md:w-[60%] lg:w-[50%] mx-auto text-2xl">
      Welcome to <span className="font-medium text-green-300">ChatWave</span>{" "}
      your space to stay in touch. Sign in or up and start chatting!
    </header>
  );
}
