import { CategoryI } from "@/interfaces";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
export default async function Categories() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories",
  );
  const { data: categories }: { data: CategoryI[] } = await response.json();

  return (
    <section className="px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Shop by Category
            </h2>
            <p className="text-sm text-muted-foreground mt-2 uppercase">
              Curated collections to match your style.
            </p>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            {categories.length} Categories
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((cat) => (
          <Link href={"/categories/" + cat._id} key={cat._id}>
            <Card className="group relative overflow-hidden border-muted/60 bg-background/60 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-primary/40 opacity-70 transition group-hover:opacity-90" />
              <Image
                src={cat.image}
                width={600}
                height={600}
                alt={`${cat.name} cover`}
                className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
              />

              <CardHeader>
                <CardAction>
                  <Badge variant="secondary" className="text-black">
                    {cat.slug}
                  </Badge>
                </CardAction>
                <CardTitle>{cat.name}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
