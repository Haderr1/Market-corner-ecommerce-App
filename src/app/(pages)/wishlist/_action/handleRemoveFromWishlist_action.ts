"use server";
import { getUserToken } from "@/app/Helpers/getUserToken";

export async function handleRemoveFromWishlistAction(productId: string) {
	const token = await getUserToken();

	// بعد ما تحذفيه، اعملي تحديث للبيانات عن طريق getWishlistData()
	const response = await fetch(`${process.env.API_URL}/wishlist/${productId}`, {
		method: "DELETE",
		headers: {
			token: token!,
			"content-type": "application/json",
		},
	});

	const data = await response.json();
	console.log(data);
	return data;
}
