"use server";

import { WishlistResponseI } from "@/interfaces/wishlist";

export async function GetWishlistDataAction() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzdhOGYxODI0ZDMzNjJjNDUyYWQyYSIsIm5hbWUiOiJIYWRlciBGYXJhZyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY5NDQ5ODIxLCJleHAiOjE3NzcyMjU4MjF9.51CjXx1gdrmBPQh1haOuP5_TAyzobWdjModDlGs6OY4",
      },
    },
  );
  const data: WishlistResponseI = await response.json();
  return data;
}
