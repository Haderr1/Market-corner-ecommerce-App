import { LoaderPinwheel } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <>
      <div className="container mx-auto flex items-center justify-center min-h-screen">
        <div className="flex gap-4 ">
          <h1 className="text-5xl">Loading ... </h1>
          <LoaderPinwheel className="animate-spin h-14 w-14 text-primary" />
        </div>
      </div>
    </>
  );
}
