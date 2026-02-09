"use server";

export async function handleForgetPassword(values: { email: string }) {
	const response = await fetch(`${process.env.API_URL}/auth/forgotPasswords`, {
		method: "POST",
		body: JSON.stringify(values),
		headers: { "Content-Type": "application/json" },
	});

	const data = await response.json();

	return  data ;
}
