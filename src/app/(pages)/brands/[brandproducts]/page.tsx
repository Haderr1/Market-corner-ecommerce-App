import { ProductI } from "@/interfaces";
import { Params } from "next/dist/server/request/params";
import React from "react";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/product-card/productcard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBagIcon } from "lucide-react";

export default async function BrandProducts({ params }: { params: Params }) {
	const { brandproducts } = await params;
	const response = await fetch(
		`${process.env.API_URL}/products?brand=${brandproducts}`,
	);
	const { data: products }: { data: ProductI[] } = await response.json();
	console.log(products);

	if (products.length == 0) {
		return (
			<div className="p-8 flex flex-col justify-center items-center gap-2 min-h-[75vh]">
				<ShoppingBagIcon className="text-primary w-30 h-50" /> No Products In
				This Brand, You Can Check Other Brands
				<Link href="/brands">
					<Button> Check More </Button>
				</Link>
			</div>
		);
	}

	return (
		<>
			<div className="px-4 py-8 md:py-12">
				<div className="mx-auto max-w-6xl">
					<div className="mb-6 flex items-end justify-between gap-4">
						<div>
							<h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
								Shop by Brand
							</h2>
							<p className="text-sm text-muted-foreground mt-2 uppercase">
								Curated collections to match your style.
							</p>
						</div>
						<Badge variant="secondary" className="hidden sm:inline-flex">
							{products.length} product
						</Badge>
					</div>

					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{products.map((p) => (
							<ProductCard products={p} key={p._id} />
						))}
					</div>
				</div>
			</div>
		</>
	);
}
