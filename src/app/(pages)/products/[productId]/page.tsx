import { ProductI } from "@/interfaces";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Params } from "next/dist/server/request/params";
import React from "react";
import { Star } from "lucide-react";
import ProductSlider from "@/components/productSlider/productSlider";
import AddToCart from "@/components/AddToCart/AddToCart";

export default async function ProductDetails({ params }: { params: Params }) {
  const { productId } = await params;
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products/" + productId,
  );

  const { data: products }: { data: ProductI } = await response.json();

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2">
        <ProductSlider products={products} />
        <Card>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold">{products.title}</h1>
                <div className="flex gap-2">
                  <Badge variant="secondary">{products.category.name}</Badge>
                  <Badge variant="outline">{products.brand.name}</Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pt-6">
                  {products.description}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium flex gap-2 items-center">
                  <Star className="text-yellow-300 h-4.5 w-4.5" />{" "}
                  {products.ratingsAverage}
                </span>
                <span className="text-muted-foreground">
                  ({products.ratingsQuantity} reviews)
                </span>
              </div>
            </div>
            <Separator />

            <p className="text-3xl font-semibold text-end">
              {products.price} EGP
            </p>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <AddToCart productId={products._id} />
            <p className="text-xs text-muted-foreground text-center">
              Available quantity: {products.quantity}
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
