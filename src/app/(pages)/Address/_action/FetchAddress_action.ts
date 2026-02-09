"use server";
import { getUserToken } from "@/app/Helpers/getUserToken";

export async function FetchAddressesAction() {
	const token = await getUserToken();

	const response = await fetch(`${process.env.API_URL}/addresses`, {
		headers: {
			token: token!,
			"content-type": "application/json",
		},
	});
	const data = await response.json();
	return data;
}
