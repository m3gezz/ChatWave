import React from "react";
import { FaSpinner } from "react-icons/fa6";

export default function Spinner() {
  return (
    <div
      role="status"
      className="flex items-center gap-1.5 select-none mx-auto text-center"
    >
      <FaSpinner className="animate-spin" />
      Please wait
    </div>
  );
}
