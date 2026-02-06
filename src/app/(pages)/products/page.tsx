import ProductCard from "@/components/product-card/productcard";
import { ProductI } from "@/interfaces";
import React from "react";

export default async function Products() {
  const response = await fetch(`${process.env.API_URL}/products`);
  const { data: products }: { data: ProductI[] } = await response.json();
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product._id} products={product} />
        ))}
      </div>
    </>
  );
}
