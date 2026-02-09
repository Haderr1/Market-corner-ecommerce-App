"use server";

import { WishlistResponseI } from "@/interfaces/wishlist";
import { getUserToken } from "@/app/Helpers/getUserToken";

export async function GetWishlistDataAction() {
	const token = await getUserToken();

	const response = await fetch(`${process.env.API_URL}/wishlist`, {
		headers: {
			token: token!,
		},
	});
	const data: WishlistResponseI = await response.json();
	return data;
}
