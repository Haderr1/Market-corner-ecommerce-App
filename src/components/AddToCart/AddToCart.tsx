"use client";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Loader2, ShoppingBagIcon } from "lucide-react";
import toast from "react-hot-toast";
import { CartContext } from "@/context/CartContext";

export default function AddToCart({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { getCartData, setCartData } = useContext(CartContext);
  async function addToCart() {
    setIsLoading(true);
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzdhOGYxODI0ZDMzNjJjNDUyYWQyYSIsIm5hbWUiOiJIYWRlciBGYXJhZyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY5NDQ5ODIxLCJleHAiOjE3NzcyMjU4MjF9.51CjXx1gdrmBPQh1haOuP5_TAyzobWdjModDlGs6OY4",
          "content-type": "application/json",
        },
      },
    );

    const data = await response.json();
    data.status == "success" && toast.success("product added successfully");
    data.statusMsg == "fail" && toast.error("product added failed");
    console.log(data);
    setCartData(data);
    setIsLoading(false);
  }

  return (
    <>
      {/*       <Button onClick={addToCart} className="w-full grow">
       */}
      <Button
        onClick={() => {
          addToCart();
        }}
        className="w-full grow"
      >
        {isLoading ? <Loader2 className="animate-spin" /> : <ShoppingBagIcon />}
        Add to cart
      </Button>
    </>
  );
}
