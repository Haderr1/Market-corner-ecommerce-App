"use server";
import { getUserToken } from "@/app/Helpers/getUserToken";

export async function checkOutSessionAction(
	cartId: string,
	shippingAddress: {
		detailsId?: string;
		phone?: string;
		city?: string;
	},
) {
	const token = await getUserToken();

	const response = await fetch(
		`${process.env.API_URL}/orders/checkout-session/${cartId}?url=http://localhost:3000`,
		{
			method: "POST",
			body: JSON.stringify({ shippingAddress }),
			headers: {
				token: token!,
				"content-type": "application/json",
			},
		},
	);
	const data = await response.json();
	return data;
}
