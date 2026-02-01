"use client";

import React, { useEffect, useState } from "react";
import type { ordersI } from "@/interfaces/orders";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AllOrders() {
  const [orders, setOrders] = useState<ordersI[]>([]);
  const [loading, setLoading] = useState(false);

  async function getAllOrders(cartOwner: string) {
    setLoading(true);

    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/orders/user/" + cartOwner,
    );

    const data: ordersI[] = await response.json();
    setOrders(data);

    setLoading(false);
  }

  useEffect(() => {
    const cartOwner = localStorage.getItem("cartOwner");
    if (!cartOwner || cartOwner === "undefined") return;

    getAllOrders(cartOwner);
  }, []);

  if (loading)
    return <div className="container mx-auto px-6 py-10">Loading...</div>;

  if (!orders.length)
    return (
      <div className="container mx-auto px-6 py-10">
        <Card className="rounded-2xl">
          <CardContent className="py-10 text-center">
            <p className="font-semibold">No orders yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              When you checkout, your orders will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <div className="container mx-auto px-6 py-10 space-y-4">
      <h1 className="text-3xl font-bold">All Orders</h1>

      {orders.map((o) => (
        <Card key={o._id} className="rounded-2xl border-muted/60">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="font-semibold">Order #{o.id}</p>

                <div className="flex flex-wrap gap-2">
                  <Badge variant={o.isPaid ? "default" : "secondary"}>
                    {o.isPaid ? "Paid" : "Unpaid"}
                  </Badge>

                  <Badge variant={o.isDelivered ? "default" : "secondary"}>
                    {o.isDelivered ? "Delivered" : "Pending"}
                  </Badge>

                  <Badge variant="outline">{o.paymentMethodType}</Badge>
                </div>

                <p className="text-sm text-muted-foreground">
                  {new Date(o.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-xl font-bold">{o.totalOrderPrice} EGP</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <Separator />

            {/* Shipping */}
            <div className="text-sm">
              <p className="font-semibold mb-1">Shipping</p>
              <p className="text-muted-foreground">
                {o.shippingAddress.city} • {o.shippingAddress.phone}
              </p>
            </div>

            {/* Prices */}
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl bg-muted/30 p-3">
                <p className="text-muted-foreground">Tax</p>
                <p className="font-semibold">{o.taxPrice} EGP</p>
              </div>

              <div className="rounded-xl bg-muted/30 p-3">
                <p className="text-muted-foreground">Shipping</p>
                <p className="font-semibold">{o.shippingPrice} EGP</p>
              </div>

              <div className="rounded-xl bg-muted/30 p-3">
                <p className="text-muted-foreground">Total</p>
                <p className="font-semibold">{o.totalOrderPrice} EGP</p>
              </div>
            </div>

            {/* Items */}
            <Accordion type="single" collapsible>
              <AccordionItem value="items">
                <AccordionTrigger>
                  Cart Items ({o.cartItems.length})
                </AccordionTrigger>

                <AccordionContent>
                  <div className="space-y-2">
                    {o.cartItems.map((it: any, idx) => (
                      <div
                        key={it._id ?? idx}
                        className="flex justify-between rounded-xl border border-muted/60 p-3"
                      >
                        <div>
                          <p className="font-medium">{it.product?.title}</p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {it.count}
                          </p>
                        </div>
                        <p className="font-semibold">{it.price} EGP</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
