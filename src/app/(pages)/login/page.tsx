"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FieldLabel } from "@/components/ui/field";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  email: z
    .string()
    .nonempty("email is required")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "invalid email address",
    ),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .min(1, "Password is required."),
});

type FormFields = z.infer<typeof formSchema>;

export default function Login() {
  const searchParams = useSearchParams(); // to get the error message from the query params and show it in the form message(****=****error=Invalid%20credentials) and show it in the form message
  const error = searchParams.get("error");

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

 async function onSubmit(values: FormFields) {
    setIsLoading(true);
    // Handle form submission, e.g., call your authentication API
    //خبعت البيانات بتاعتي عشان اعمل بيها تسجيل دخول لل next auth
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/",
      redirect: true,
    });
    console.log(response);
    setIsLoading(false);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-sm">
        <CardHeader className="space-y-2 text-center pb-6">
          <CardTitle className="text-2xl font-semibold">Login</CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter your email and password to continue.
          </p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col justify-end">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FieldLabel>Email</FieldLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FieldLabel>Password</FieldLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        autoComplete="current-password"
                        placeholder="••••••••"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link href={'/forgetpassword'} className="text-primary text-end hover:text-primary/80 text-sm pb-5">
              ForgetPassword?
              </Link>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Separator/>
              <Button type="submit" className="w-full " disabled={isLoading}>
                {isLoading ? <LoaderIcon className="animate-spin" /> : null}
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
