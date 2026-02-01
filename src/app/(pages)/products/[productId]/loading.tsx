import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <>
      <Card className="grid gap-6 md:grid-cols-2 p-4">
        <CardHeader>
          <Skeleton className="h-70 w-full rounded-lg" />
        </CardHeader>
        <div className="flex flex-col gap-2 justify-between">
          <CardContent>
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2 mt-5" />
            <Skeleton className="h-4 w-2/3 mt-5" />
            <Skeleton className="h-4 w-1/2 mt-5" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </div>
      </Card>
    </>
  );
}
