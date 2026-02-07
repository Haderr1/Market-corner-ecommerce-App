"use server";

import { CartResponseI } from "@/interfaces/CartResponse";

export async function GetCartDataAction() {
	const response = await fetch(`${process.env.API_URL}/cart`, {
		headers: {
			token:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzdhOGYxODI0ZDMzNjJjNDUyYWQyYSIsIm5hbWUiOiJIYWRlciBGYXJhZyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY5NDQ5ODIxLCJleHAiOjE3NzcyMjU4MjF9.51CjXx1gdrmBPQh1haOuP5_TAyzobWdjModDlGs6OY4",
		},
	});
	const data: CartResponseI = await response.json();
	return data;
}
