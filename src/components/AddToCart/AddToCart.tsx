"use client";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Loader2, ShoppingBagIcon } from "lucide-react";
import toast from "react-hot-toast";
import { CartContext } from "@/context/CartContext";
import { AddToCartAction } from "@/app/(pages)/products/_action/AddToCart_action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddToCart({ productId }: { productId: string }) {
	const [isLoading, setIsLoading] = useState(false);
	const { getCartData, setCartData } = useContext(CartContext);
  const router = useRouter()
	const session = useSession();
	async function addToCart() {
		if (session.status == "authenticated") {
			setIsLoading(true);
			const data = await AddToCartAction(productId);
			data.status == "success" && toast.success("product added successfully");
			data.statusMsg == "fail" && toast.error("product added failed");
			console.log(data);
			setCartData(data);
			setIsLoading(false);
		}
    else{
router.push('/login')
    }
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
