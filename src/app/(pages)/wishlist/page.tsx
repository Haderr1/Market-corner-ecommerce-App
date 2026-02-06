"use client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { wishlistContext } from "@/context/wishlistContext";
import { useContext, useState } from "react";
import { Loader2, Star, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { handleRemoveFromWishlistAction } from "./_action/handleRemoveFromWishlist_action";

export default function WishlistPage() {
  const { wishlistData, getWishlistData } = useContext(wishlistContext);

  const [isRemovingId, setIsRemovingId] = useState<string | null>(null);

  async function handleRemoveFromWishlist(productId: string) {
    setIsRemovingId(productId);
    const data = await handleRemoveFromWishlistAction(productId);

    console.log(data);
    if (data.status === "success") {
      toast.success(data.message);
      getWishlistData();
    }
    setIsRemovingId(null);
  }

  return (
    <section className="px-4 py-10 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Wishlist
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Products you saved for later.
            </p>
          </div>

          <Badge variant="secondary" className="rounded-full w-fit">
            {wishlistData?.count} items
          </Badge>
        </div>

        <Separator className="mb-6" />

        {/* Empty */}
        {wishlistData?.data?.length === 0 ? (
          <Card className="border-border/60 bg-background/70">
            <CardHeader>
              <CardTitle className="text-base">No items yet</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Your wishlist is empty. Go to products and add what you like.
              <div className="mt-4">
                <Button asChild>
                  <Link href="/products">Browse Products</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistData?.data?.map((p) => (
              <Card
                key={p._id}
                className="group relative overflow-hidden rounded-2xl border-border/60 bg-background/70 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <Link href={`/products/${p._id}`}>
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-primary/20 via-primary/15 to-transparent opacity-70 transition group-hover:opacity-90" />

                  <div className="relative aspect-4/3 w-full overflow-hidden">
                    <Image
                      src={p.imageCover}
                      alt={p.title}
                      width={500}
                      height={500}
                      className="object-cover "
                    />
                  </div>
                  <CardContent className="relative p-4">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="rounded-full">
                        {p.category?.name ?? "Category"}
                      </Badge>
                      {p.brand?.name && (
                        <Badge variant="outline" className="rounded-full">
                          {p.brand.name}
                        </Badge>
                      )}
                      {typeof p.ratingsAverage === "number" && (
                        <Badge className="rounded-full" variant="secondary">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {p.ratingsAverage}
                        </Badge>
                      )}
                    </div>

                    <h3 className="line-clamp-2 font-semibold leading-snug">
                      {p.title}
                    </h3>

                    <div className="mt-4 flex items-end justify-between gap-3">
                      <div className="flex flex-col">
                        {p.priceAfterDiscount ? (
                          <>
                            <span className="text-base font-bold">
                              {p.priceAfterDiscount} EGP
                            </span>
                            <span className="text-xs text-red-500 line-through">
                              {p.price} EGP
                            </span>
                          </>
                        ) : (
                          <span className="text-base font-bold">
                            {p.price} EGP
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Link>
                <div className=" absolute bottom-6 right-3 group-hover:scale-105 transition">
                  <Button
                    size="icon"
                    variant="destructive"
                    className="rounded-xl"
                    title="Make it client to remove"
                    onClick={() => handleRemoveFromWishlist(p._id)}
                  >
                    {isRemovingId === p._id ? (
                      <Loader2 className="animate-spin m-px my-1" />
                    ) : (
                      <Trash />
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
