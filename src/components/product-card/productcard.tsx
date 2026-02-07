"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ProductI } from "@/interfaces";
import { StarHalf, StarIcon } from "lucide-react";
import Link from "next/link";
import AddToCart from "../AddToCart/AddToCart";
import AddToWishlist from "../AddToWishlist/AddToWishlist";

export default function ProductCard({ products }: { products: ProductI }) {


	return (
		<>
			<Card className="relative mx-auto w-full max-w-sm pt-0">
				<Link href={"/products/" + products._id}>
					<Image
						className="border-b-gray-300 pb-2 rounded-xl w-full h-110 relative"
						src={products.imageCover}
						alt={products.title}
						width={200}
						height={300}
					/>

					<CardHeader className="mt-auto">
						<CardAction>
							<Badge variant="secondary">{products.brand.name}</Badge>
						</CardAction>
						<CardTitle>{products.title.split(" ", 2).join(" ")}</CardTitle>
						<CardDescription>
							{products.description.split(" ", 5).join(" ")}
						</CardDescription>
					</CardHeader>
				</Link>
				<AddToWishlist productId={products._id} />
				<CardFooter className="flex flex-col mt-auto">
					<div className="flex gap-2 justify-between items-center w-full pb-4 ">
						<div className="flex gap-2">
							<div className="flex">
								<StarIcon className="text-yellow-300" />
								<StarIcon className="text-yellow-300" />
								<StarIcon className="text-yellow-300" />
								<StarHalf className="text-yellow-300" />
							</div>
							<p>{products.ratingsAverage}</p>
						</div>
						<p className="font-medium">{products.price} EGB</p>
					</div>
					<div className="pt-3 border-t border-accent w-full">
						<AddToCart productId={products._id} />
					</div>
				</CardFooter>
			</Card>
		</>
	);
}
