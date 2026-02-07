import { ProductI, SubcategoryI } from "@/interfaces";
import { Params } from "next/dist/server/request/params";
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export default async function SubCategories({ params }: { params: Params }) {
  const { subcategories } = await params;
  const response = await fetch(
    `${process.env.API_URL}/categories/${subcategories}/subcategories`,
  );
  const { data: subcategoriesData }: { data: SubcategoryI[] } =
    await response.json();
  console.log(subcategoriesData);

  return (
    <>
      <div className="px-4 py-8 md:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Shop by SubCategory
              </h2>
              <p className="text-sm text-muted-foreground mt-2 uppercase">
                Curated collections to match your style.
              </p>
            </div>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              {subcategoriesData.length} SubCategories
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {subcategoriesData.map((SubCat) => (
                <Card key={SubCat._id} className="group relative overflow-hidden border-muted/60 bg-background/60 transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="absolute inset-0 bg-linear-to-t from-primary/20 via-transparent to-primary/40 opacity-70 transition group-hover:opacity-90" />
                  <CardHeader>
                    <CardAction>
                      <Badge variant="secondary" className="text-black">
                        {SubCat.slug}
                      </Badge>
                    </CardAction>
                    <CardTitle>{SubCat.name}</CardTitle>
                  </CardHeader>
                </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
