"use client";
import { WishlistResponseI } from "@/interfaces/wishlist";
import React, { createContext, useEffect, useState } from "react";
import { GetWishlistDataAction } from "./_action/GetWishlistData_action";

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
    const data = await GetWishlistDataAction();
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
