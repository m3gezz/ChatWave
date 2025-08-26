import React from "react";
import { Loader2Icon } from "lucide-react";

export default function Spinner() {
  return (
    <div role="status" className="flex items-center gap-1 select-none mx-auto">
      <Loader2Icon className="animate-spin" />
      Please wait
    </div>
  );
}
