"use client";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Loader2, ShoppingBagIcon } from "lucide-react";
import toast from "react-hot-toast";
import { CartContext } from "@/context/CartContext";
import { AddToCartAction } from "@/app/(pages)/products/_action/AddToCart_action";

export default function AddToCart({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { getCartData, setCartData } = useContext(CartContext);
  async function addToCart() {
    setIsLoading(true);
    const data = await AddToCartAction(productId);
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
