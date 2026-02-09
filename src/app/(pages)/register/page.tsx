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
import { Separator } from "@/components/ui/separator";
import { handleRegisterAction } from "./_action/handleRegister";
import Link from "next/link";

const formSchema = z
	.object({
		name: z
			.string()
			.nonempty("name is required")
			.min(3, "at least 3 characters"),
		email: z
			.string()
			.nonempty("email is required")
			.regex(
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				"invalid email address",
			),
		password: z
			.string()
			.nonempty("password is required")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
				"password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
			),
		rePassword: z.string().nonempty("rePassword is required"),
		phone: z
			.string()
			.regex(
				/^01\d{9}$/,
				"Phone must be a valid Egyptian number (01xxxxxxxxx)",
			),
	})
	.refine((data) => data.password === data.rePassword, {
		path: ["rePassword"],
		message: "Passwords do not match",
	});

type FormFields = z.infer<typeof formSchema>;

export default function Register() {
	const [apiError, setApiError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const form = useForm<FormFields>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			rePassword: "",
			phone: "",
		},
		mode: "onSubmit",
	});

	async function onSubmit(values: FormFields) {
		setIsLoading(true);
		setApiError(null);

		const data = await handleRegisterAction(values);

		if (data.message === "success") {
			router.push("/login");
			return;
		}

		setApiError(data.errors?.[0]?.msg || "Signup failed");

		setIsLoading(false);
	}

	return (
		<>
			<div className="min-h-[80vh] flex items-center justify-center px-4">
				<Card className="w-full max-w-md rounded-2xl shadow-sm">
					<CardHeader className="space-y-2 text-center pb-6">
						<CardTitle className="text-2xl font-semibold">Sign Up</CardTitle>
						<p className="text-sm text-muted-foreground">
							Create your account to start shopping.
						</p>
					</CardHeader>

					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-4"
							>
								<FormField
									name="name"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FieldLabel>Name</FieldLabel>
											<FormControl>
												<Input {...field} placeholder="Your name" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

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
									name="phone"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FieldLabel>Phone</FieldLabel>
											<FormControl>
												<Input
													{...field}
													inputMode="tel"
													autoComplete="tel"
													placeholder="01xxxxxxxxx"
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
													autoComplete="new-password"
													placeholder="••••••••"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									name="rePassword"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FieldLabel>Confirm Password</FieldLabel>
											<FormControl>
												<Input
													{...field}
													type="password"
													autoComplete="new-password"
													placeholder="••••••••"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{apiError && <p className="text-sm text-red-500">{apiError}</p>}
								<Separator />
								<Button type="submit" className="w-full" disabled={isLoading}>
									{isLoading ? <LoaderIcon className="animate-spin" /> : null}
									{isLoading ? "Creating..." : "Create Account"}
								</Button>
								<p className="text-sm text-secondary-500 my-4 text-center">
									Already have an account?
									<Link
										href={"/login"}
										className="text-primary hover:text-primary/80"
									>
										Login
									</Link>
								</p>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
