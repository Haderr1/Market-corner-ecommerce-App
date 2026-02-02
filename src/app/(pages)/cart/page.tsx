"use client";

import React, { useContext, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, Minus, Plus, Trash, Trash2 } from "lucide-react";
import { CartContext } from "@/context/CartContext";
import Loading from "@/app/loading";
import Image from "next/image";
import { CartResponseI } from "@/interfaces";
import toast from "react-hot-toast";
import { json } from "stream/consumers";
import { stringify } from "querystring";
import CheckOut from "@/components/checkout/CheckOut";

export default function Cart() {
  const { cartData, isLoading, getCartData, setCartData } =
    useContext(CartContext);
  const [RemovingId, setRemovingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState<boolean>(false);

  if (typeof cartData?.data?.products[0]?.product == "string") {
    getCartData();
  }
  /*   typeof cartData?.data.products[0].product == "string" && getCartData();
   */
  async function RemoveCartItem(itemId: string) {
    setRemovingId(itemId);
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart/" + itemId,
      {
        method: "DELETE",
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzdhOGYxODI0ZDMzNjJjNDUyYWQyYSIsIm5hbWUiOiJIYWRlciBGYXJhZyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY5NDQ5ODIxLCJleHAiOjE3NzcyMjU4MjF9.51CjXx1gdrmBPQh1haOuP5_TAyzobWdjModDlGs6OY4",
        },
      },
    );
    const data: CartResponseI = await response.json();
    console.log(data);
    if (data.status == "success") {
      toast.success("product deleted successfully");
      setCartData(data);
    }
    setRemovingId(null);
  }

  async function UpdateCartItem(count: number, itemId: string) {
    /* مش اافضل حل لان مكش احسن حاجه نخلي اليوزر يريموف من كذا مكان */
    /*  if (count == 0) {
      RemoveCartItem(itemId);
    } */
    setUpdatingId(itemId);
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart/" + itemId,
      {
        method: "PUT",
        body: JSON.stringify({ count }),
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzdhOGYxODI0ZDMzNjJjNDUyYWQyYSIsIm5hbWUiOiJIYWRlciBGYXJhZyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY5NDQ5ODIxLCJleHAiOjE3NzcyMjU4MjF9.51CjXx1gdrmBPQh1haOuP5_TAyzobWdjModDlGs6OY4",
          "content-type": "application/json",
        },
      },
    );

    const data: CartResponseI = await response.json();
    console.log(data);
    setCartData(data);
    if (data.status) {
      toast.success("cart updated successfully");
      setUpdatingId(null);
    }
  }

  async function clearCart() {
    setIsClearing(true);
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        method: "DELETE",
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzdhOGYxODI0ZDMzNjJjNDUyYWQyYSIsIm5hbWUiOiJIYWRlciBGYXJhZyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY5NDQ5ODIxLCJleHAiOjE3NzcyMjU4MjF9.51CjXx1gdrmBPQh1haOuP5_TAyzobWdjModDlGs6OY4",
        },
      },
    );

    const data: CartResponseI = await response.json();
    console.log(data);
    toast.success("cart deleted successfully");
    setCartData(null);
    setIsClearing(false);
  }

  return (
    <>
      {isLoading ||
      (typeof cartData?.data.products[0]?.product == "string" &&
        getCartData()) ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT SIDE */}
          <div className="col-span-8 space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
            <div className="flex gap-4 items-center">
              <p className="text-sm text-muted-foreground mt-1">
                {cartData?.numOfCartItems} item in your cart
              </p>
              <div className="h-[2px] w-12 bg-primary mt-2 rounded-full" />
            </div>
            {/* Cart Item */}
            {cartData?.data?.products?.map((item) => (
              <Card key={item._id} className="rounded-2xl border-muted/60">
                <CardContent className="flex items-center gap-4 p-4">
                  {/* Image */}
                  <Image
                    src={item?.product.imageCover}
                    width={80}
                    height={80}
                    alt={item.product.title}
                    className="w-24 h-24 rounded-md"
                  />

                  {/* Info */}
                  <div className="flex-1 space-y-1">
                    <h3 className="font-medium">{item.product.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.product.brand.name} . {item.product.category.name}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        onClick={() =>
                          UpdateCartItem(item.count - 1, item.product._id)
                        }
                        disabled={item.count == 1}
                        variant="outline"
                        size="sm"
                      >
                        <Minus />
                      </Button>
                      <span className="text-sm">
                        {updatingId == item.product._id ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          item.count
                        )}
                      </span>
                      <Button
                        onClick={() =>
                          UpdateCartItem(item.count + 1, item.product._id)
                        }
                        variant="outline"
                        size="sm"
                      >
                        <Plus />
                      </Button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex flex-col gap-4 justify-end items-end">
                    <p className="font-bold text-lg">{item.price} EGP</p>
                    <Button
                      onClick={() => RemoveCartItem(item.product._id)}
                      variant="destructive"
                      className="  h-auto text-sm flex justify-center items-center"
                    >
                      {RemovingId == item.product._id ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Trash />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="col-span-4 mt-20">
            <Card className="bg-muted/30">
              <CardHeader>
                <h2 className="font-semibold">Order Summary</h2>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{cartData?.data.totalCartPrice} EGP</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <Badge variant="secondary">Free</Badge>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{cartData?.data.totalCartPrice} EGP</span>
                </div>

                {cartData?.cartId && <CheckOut cartId={cartData.cartId} />}
                <Button variant="outline" className="w-full h-11">
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
            <Button
              onClick={() => clearCart()}
              variant="outline"
              className="text-red-600 mt-6 hover:bg-red-600 hover:text-white text-start"
            >
              {isClearing ? <Loader2 className="animate-spin" /> : <Trash2 />}{" "}
              Clear Cart
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
