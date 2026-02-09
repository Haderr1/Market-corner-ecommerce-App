"use client";

import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";

import { verifyResetCodeAction } from "./_action/verifyResetCode_action";
import { resetPasswordAction } from "./_action/resetPassword_action";

const verifySchema = z.object({
	resetCode: z.string().min(1, "Code is required").min(6, "Code is too short"),
});

const resetSchema = z.object({
	email: z
		.string()
		.nonempty("email is required")
		.regex(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			"invalid email address",
		),
	newPassword: z
		.string()
		.min(6, "Password must be at least 6 characters long.")
		.min(1, "Password is required."),
});

type VerifyFields = z.infer<typeof verifySchema>;
type ResetFields = z.infer<typeof resetSchema>;

export default function ChangePassword() {
	const router = useRouter();
	const [step, setStep] = useState<"verify" | "reset">("verify");
	const [loading, setLoading] = useState(false);
	const [serverError, setServerError] = useState<string | null>(null);

	const verifyForm = useForm<VerifyFields>({
		resolver: zodResolver(verifySchema),
		defaultValues: { resetCode: "" },
	});

	const resetForm = useForm<ResetFields>({
		resolver: zodResolver(resetSchema),
		defaultValues: { email: "", newPassword: "" },
	});

	async function onVerify(values: VerifyFields) {
		setServerError(null);
		setLoading(true);

		const data = await verifyResetCodeAction(values);

		setLoading(false);

		if (data.message == "success") {
			setStep("reset");
			return;
		}

		setServerError(data.message || "Invalid code");
	}

	async function onReset(values: ResetFields) {
		setServerError(null);
		setLoading(true);

		/* 
        //to insure validation and remove space
        	const data = await resetPasswordAction({
			email: values.email.trim(),
			newPassword: values.newPassword.trim(),
		});
        */
		const data = await resetPasswordAction(values);

		setLoading(false);

		if (data.message == "success") {
			router.push("/login");
			return;
		}

		setServerError(data.message || "Reset failed");
	}

	return (
		<div className="min-h-[80vh] flex items-center justify-center px-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Change Password</CardTitle>
				</CardHeader>

				<CardContent className="space-y-4">
					{step === "verify" ? (
						<Form {...verifyForm}>
							<form
								onSubmit={verifyForm.handleSubmit(onVerify)}
								className="space-y-4"
							>
								<FormField
									control={verifyForm.control}
									name="resetCode"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input placeholder="Reset code" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{serverError && (
									<p className="text-sm text-red-600">{serverError}</p>
								)}

								<Button className="w-full" disabled={loading}>
									{loading ? "Verifying..." : "Verify"}
								</Button>
							</form>
						</Form>
					) : (
						<Form {...resetForm}>
							<form
								onSubmit={resetForm.handleSubmit(onReset)}
								className="space-y-4"
							>
								<FormField
									control={resetForm.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													type="email"
													placeholder="Email"
													autoComplete="email"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={resetForm.control}
									name="newPassword"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													type="password"
													placeholder="New password"
													autoComplete="new-password"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{serverError && (
									<p className="text-sm text-red-600">{serverError}</p>
								)}

								<div className="flex gap-2">
									<Button
										type="button"
										variant="secondary"
										className="w-1/3"
										onClick={() => {
											setStep("verify");
											setServerError(null);
										}}
										disabled={loading}
									>
										Back
									</Button>

									<Button className="w-2/3" disabled={loading}>
										{loading ? "Updating..." : "Update"}
									</Button>
								</div>
							</form>
						</Form>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
