"use client";
import { WishlistResponseI } from "@/interfaces/wishlist";
import React, { createContext, useEffect, useState } from "react";

export const wishlistContext = createContext<{
  wishlistData: WishlistResponseI | null;
  setWishlistData: (value: WishlistResponseI | null) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  getWishlistData: () => void;
}>({
  wishlistData: null,
  setWishlistData: () => {},
  isLoading: false,
  setIsLoading: () => {},
  getWishlistData: () => {},
});

export default function WishlistContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlistData, setWishlistData] = useState<WishlistResponseI | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  async function getWishlistData() {
    setIsLoading(true);
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
    console.log(data);
    setWishlistData(data);
    setIsLoading(false);
  }
  useEffect(() => {
    getWishlistData();
  }, []);

  return (
    <>
      <wishlistContext.Provider
        value={{
          wishlistData,
          setWishlistData,
          isLoading,
          setIsLoading,
          getWishlistData,
        }}
      >
        {children}
      </wishlistContext.Provider>
    </>
  );
}
