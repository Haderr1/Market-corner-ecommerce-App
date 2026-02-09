"use server";

import { AddressResponseI } from "@/interfaces/Address";
import { getUserToken } from "@/app/Helpers/getUserToken";

export async function DeleteAddressAction(addressId: string) {
	const token = await getUserToken();

	const response = await fetch(
		`${process.env.API_URL}/addresses/${addressId}`,
		{
			method: "DELETE",
			headers: {
				token: token!,
				"content-type": "application/json",
			},
		},
	);
	const data: AddressResponseI = await response.json();
	return data;
}
