import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-lg font-semibold text-green-600">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-accent-foreground sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-green-300 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button variant={"secondary"}>
            <Link to={"/guest"}>Head back</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
