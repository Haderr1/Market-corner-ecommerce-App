"use server";

import { CartResponseI } from "@/interfaces/CartResponse";
import { getUserToken } from "@/app/Helpers/getUserToken";

export async function ClearCartAction() {
	const token = await getUserToken();

	const response = await fetch(`${process.env.API_URL}/cart`, {
		method: "DELETE",
		headers: {
			token: token!,
		},
	});

	const data: CartResponseI = await response.json();
	return data;
}
