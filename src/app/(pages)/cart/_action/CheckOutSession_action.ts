"use server";

export async function checkOutSessionAction(
  cartId: string,
  shippingAddress: {
    detailsId?: string;
    phone?: string;
    city?: string;
  },
) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
    {
      method: "POST",
      body: JSON.stringify({ shippingAddress }),
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzdhOGYxODI0ZDMzNjJjNDUyYWQyYSIsIm5hbWUiOiJIYWRlciBGYXJhZyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY5NDQ5ODIxLCJleHAiOjE3NzcyMjU4MjF9.51CjXx1gdrmBPQh1haOuP5_TAyzobWdjModDlGs6OY4",
        "content-type": "application/json",
      },
    },
  );
  const data = await response.json();
  return data;
}
