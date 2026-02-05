"use client";

import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { CartResponseI } from "@/interfaces";

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
		const response = await fetch(
			"https://ecommerce.routemisr.com/api/v1/cart",
			{
				headers: {
					token:
						"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzdhOGYxODI0ZDMzNjJjNDUyYWQyYSIsIm5hbWUiOiJIYWRlciBGYXJhZyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY5NDQ5ODIxLCJleHAiOjE3NzcyMjU4MjF9.51CjXx1gdrmBPQh1haOuP5_TAyzobWdjModDlGs6OY4",
				},
			},
		);
		const data: CartResponseI = await response.json();
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
