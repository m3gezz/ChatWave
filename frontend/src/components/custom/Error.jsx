import React from "react";

export default function Error({ children }) {
  return <div className="text-sm px-2 text-destructive">{children}</div>;
}
