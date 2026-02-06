"use client";
import React, { useContext } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, Loader2, ShoppingBag, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CartContext } from "@/context/CartContext";
import { wishlistContext } from "@/context/wishlistContext";

export default function Navbar() {
  const { cartData, isLoading } = useContext(CartContext);
  const { wishlistData, isLoading: isWishlistLoading } =
    useContext(wishlistContext);

  return (
    <>
      <nav className="shadow sticky top-0 z-100 bg-white">
        <div className="container mx-auto px-24">
          <div className="flex items-center justify-between py-3">
            <h1 className="text-primary ">
              <Link href={"/"}>
                <div className="flex items-center gap-2">
                  <div className="p-1 px-2 bg-primary rounded-lg">
                    <div className="text-white">M</div>
                  </div>
                  MarketCorner
                </div>
              </Link>
            </h1>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href="/products">Products</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href="/categories">Categories</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href="/brands">Brands</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href="/subcategories">SubCategories</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex justify-between items-center gap-6">
              <Link href="/cart">
                <div className="relative">
                  <ShoppingBag className=" hover:text-primary" />
                  <Badge variant="black" className="absolute -top-3 -end-3">
                    {isLoading ? (
                      <Loader2 className="animate-spin m-px my-1" />
                    ) : (
                      cartData?.numOfCartItems
                    )}
                  </Badge>
                </div>
              </Link>
              <Link href="/wishlist">
                <div className="relative">
                  <Heart className=" hover:text-primary" />
                  <Badge variant="default" className="absolute -top-3 -end-3">
                    {isWishlistLoading ? (
                      <Loader2 className="animate-spin m-px my-1" />
                    ) : (
                      wishlistData?.count
                    )}
                  </Badge>
                </div>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm">
                    <User />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <Link href="/allorders">
                      <DropdownMenuItem>My Orders</DropdownMenuItem>
                    </Link>
                    <Link href="/Address">
                      <DropdownMenuItem>Address</DropdownMenuItem>
                    </Link>
                    <Link href="/login">
                      <DropdownMenuItem>Login</DropdownMenuItem>
                    </Link>
                    <Link href="/register">
                      <DropdownMenuItem>Register</DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <Link href="/logout">
                    <DropdownMenuItem variant="destructive">
                      Logout
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
