"use client";
import { Heart } from "lucide-react";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { wishlistContext } from "@/context/wishlistContext";
import { handleAddToWishlistAction } from "@/app/(pages)/wishlist/_action/handleAddToWishlist_action";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AddToWishlist({ productId }: { productId: string }) {
  const [isLoading, setLoading] = useState(false);
  const [wishlistClass, setWishlistClass] = useState(false);
  const { wishlistData, setWishlistData, getWishlistData } =
    useContext(wishlistContext);
  const router = useRouter();
  const session = useSession();

  //check if the product in whishlist
  function isInWishlist(productId: string) {
    return wishlistData?.data?.some((item) => item._id === productId);
  }
  async function handleAddToWishlist() {
    setLoading(true);
    const data = await handleAddToWishlistAction(productId);
    console.log(data);
    if (session.status == "authenticated") {
      if (data.status === "success") {
        toast.success("Product added to wishlist successfully");
        setWishlistClass(true);
        getWishlistData();
      }
    } else {
      router.push("/login");
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
            className={`h-5 w-5 transition ${
              isInWishlist(productId)
                ? "fill-red-500 text-red-500"
                : "text-muted-foreground"
            }`}
          />
        )}
      </Button>
    </>
  );
}
