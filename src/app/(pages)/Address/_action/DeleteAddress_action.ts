"use server";

import { AddressResponseI } from "@/interfaces/Adress";

export async function DeleteAddressAction(addressId: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
    {
      method: "DELETE",
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzdhOGYxODI0ZDMzNjJjNDUyYWQyYSIsIm5hbWUiOiJIYWRlciBGYXJhZyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY5NDQ5ODIxLCJleHAiOjE3NzcyMjU4MjF9.51CjXx1gdrmBPQh1haOuP5_TAyzobWdjModDlGs6OY4",
        "content-type": "application/json",
      },
    },
  );
  const data: AddressResponseI = await response.json();
  return data;
}
