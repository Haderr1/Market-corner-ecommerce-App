"use server";
import { getUserToken } from "@/app/Helpers/getUserToken";

import { WishlistResponseI } from "@/interfaces/wishlist";
export async function handleAddToWishlistAction(productId: string) {
	const token = await getUserToken();

	const response = await fetch(`${process.env.API_URL}/wishlist`, {
		method: "POST",
		body: JSON.stringify({ productId }),
		headers: {
			token: token!,
			"content-type": "application/json",
		},
	});
	const data: WishlistResponseI = await response.json();
	return data;
}
