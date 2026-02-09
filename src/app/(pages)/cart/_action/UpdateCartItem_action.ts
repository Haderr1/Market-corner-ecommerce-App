"use server";
import { getUserToken } from "@/app/Helpers/getUserToken";

import { CartResponseI } from "@/interfaces/CartResponse";
export async function UpdateCartItemAction(count: number, itemId: string) {
	const token = await getUserToken();

	const response = await fetch(`${process.env.API_URL}/cart/${itemId}`, {
		method: "PUT",
		body: JSON.stringify({ count }),
		headers: {
			token: token!,
			"content-type": "application/json",
		},
	});

	const data: CartResponseI = await response.json();
	return data;
}
