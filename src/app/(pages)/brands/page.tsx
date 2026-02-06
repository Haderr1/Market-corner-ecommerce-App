import { BrandI } from "@/interfaces/brand";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default async function Brands() {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
  const { data: brands }: { data: BrandI[] } = await response.json();
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
              {brands.length} Brands
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {brands.map((brand) => (
              <Card
                key={brand._id}
                className="group relative overflow-hidden border-muted/60 bg-background/60 transition duration-500 hover:-translate-y-1 hover:shadow-lg hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-primary/40 opacity-70 transition group-hover:opacity-90 " />
                <Image
                  src={brand.image}
                  width={600}
                  height={600}
                  alt={`${brand.name} cover`}
                  className="h-48 w-full object-cover "
                />

                <CardHeader>
                  <CardAction>
                    <Badge variant="secondary" className="text-black">
                      {brand.slug}
                    </Badge>
                  </CardAction>
                  <CardTitle>{brand.name}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
