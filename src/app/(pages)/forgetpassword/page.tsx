"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

import React from "react";
import { handleForgetPassword } from "./_action/handleForgetPassword_action";

const formSchema = z.object({
	email: z
		.string()
		.nonempty("email is required")
		.regex(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			"invalid email address",
		),
});

type FormFields = z.infer<typeof formSchema>;
export default function ForgetPassword() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const form = useForm<FormFields>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
		mode: "onSubmit",
	});

	async function onSubmit(values: FormFields) {
		setIsLoading(true);
		const data = await handleForgetPassword(values);
        
		if (data.statusMsg === "success") {
            router.push("/changepassword");
			return;
		}
		setError(data.message || "Server error, try again later");

		console.log("FAIL:", data);
		setIsLoading(false);
	}

	return (
		<>
			<div className="min-h-[80vh] flex items-center justify-center px-4">
				<Card className="w-full max-w-md rounded-2xl shadow-sm">
					<CardHeader className="space-y-2 text-center pb-6">
						<CardTitle className="text-2xl font-semibold">
							Forget Password
						</CardTitle>
						<p className="text-sm text-muted-foreground">
							Please enter yout email
						</p>
					</CardHeader>

					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-4"
							>
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
								{error && <p className="text-sm text-red-500">{error}</p>}
								<Separator />

								<Button type="submit" className="w-full" disabled={isLoading}>
									{isLoading ? <LoaderIcon className="animate-spin" /> : null}
									{isLoading ? "Submitting..." : "Submit"}
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
