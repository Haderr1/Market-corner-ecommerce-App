"use server";

import { CartResponseI } from "@/interfaces/CartResponse";
import { getUserToken } from "@/app/Helpers/getUserToken";

export async function GetCartDataAction() {
	const token = await getUserToken();
	const response = await fetch(`${process.env.API_URL}/cart`, {
		headers: {
			token: token!,
		},
	});
	const data: CartResponseI = await response.json();
	return data;
}
