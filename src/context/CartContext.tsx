"use client";

import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { CartResponseI } from "@/interfaces";
import { GetCartDataAction } from "./_action/GetCartData_action";

export const CartContext = createContext<{
  cartData: CartResponseI | null;
  setCartData: (value: CartResponseI | null) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  getCartData: () => void;
}>({
  cartData: null,
  setCartData: () => {},
  isLoading: false,
  setIsLoading: () => {},
  getCartData: () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartData, setCartData] = useState<CartResponseI | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getCartData() {
    //fetch cart data from api and set it to cartData state
    setIsLoading(true);
    const data = await GetCartDataAction();
    console.log(data);
    setCartData(data);
    setIsLoading(false);

    const cartOwner = data?.data?.cartOwner;
    if (cartOwner) localStorage.setItem("cartOwner", cartOwner);
    console.log("saved cartOwner:", cartOwner);
  }
  useEffect(() => {
    getCartData();
  }, []);

  return (
    <>
      <CartContext.Provider
        value={{ cartData, setCartData, isLoading, setIsLoading, getCartData }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
