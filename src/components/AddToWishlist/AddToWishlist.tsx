"use client";
import { Heart } from "lucide-react";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { WishlistResponseI } from "@/interfaces/wishlist";
import toast from "react-hot-toast";
import { wishlistContext } from "@/context/wishlistContext";
import { get } from "http";

export default function AddToWishlist({ productId }: { productId: string }) {
  const [isLoading, setLoading] = useState(false);
  const [wishlistClass, setWishlistClass] = useState(false);
  const { wishlistData, setWishlistData, getWishlistData } =
    useContext(wishlistContext);

  async function handleAddToWishlist() {
    setLoading(true);
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        method: "POST",
        body: JSON.stringify({ productId: productId }),
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzdhOGYxODI0ZDMzNjJjNDUyYWQyYSIsIm5hbWUiOiJIYWRlciBGYXJhZyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY5NDQ5ODIxLCJleHAiOjE3NzcyMjU4MjF9.51CjXx1gdrmBPQh1haOuP5_TAyzobWdjModDlGs6OY4",
          "content-type": "application/json",
        },
      },
    );
    const data: WishlistResponseI = await response.json();
    console.log(data);
    if (data.status === "success") {
      toast.success("Product added to wishlist successfully");
      setWishlistClass(true);
      getWishlistData();
    }
    setLoading(false);
  }
  return (
    <>
      <Button
        className={`absolute top-4 end-4 cursor-pointer`}
        variant="outline"
        onClick={handleAddToWishlist}
      >
        {isLoading ? (
          "Adding..."
        ) : (
          <Heart
            className={` w-8 h-8 text-primary ${wishlistClass ? "fill-red-500 text-red-500" : ""}`}
          />
        )}
      </Button>
    </>
  );
}
