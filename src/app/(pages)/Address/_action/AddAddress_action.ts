
"use server";
import { AddressResponseI } from "@/interfaces";
import { getUserToken } from "@/app/Helpers/getUserToken";

export async function AddAddressAction(newAddress: {
  name?: string;
  details?: string;
  phone?: string;
  city?: string;
}) {
  	const token = await getUserToken();

  const response = await fetch(
    `${process.env.API_URL}/addresses`,
    {
      method: "POST",
      body: JSON.stringify(newAddress),
      headers: {
       			token: token!,
        "content-type": "application/json",
      },
    },
  );
  const data: AddressResponseI = await response.json();
  return data;
}
