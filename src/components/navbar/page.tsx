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
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
	const { cartData, isLoading } = useContext(CartContext);
	const { wishlistData, isLoading: isWishlistLoading } =
		useContext(wishlistContext);
	//to get the data i login with i will use session

	const session = useSession();
	console.log(session);

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
              {session.status == "authenticated" && (
                <h2 className="text-primary font-semibold">
                  Hi, {session.data.user.name}!
                </h2>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm">
                    <User />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  {session.status == "authenticated" ? (
                    <>
                      <Link href="/allorders">
                        <DropdownMenuItem>My Orders</DropdownMenuItem>
                      </Link>
                      <Link href="/Address">
                        <DropdownMenuItem>Address</DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <Link href="/logout">
                        <DropdownMenuItem
                          onClick={() =>
                            signOut({
                              callbackUrl: "/",
                            })
                          }
                          variant="destructive"
                        >
                          Logout
                        </DropdownMenuItem>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/login">
                        <DropdownMenuItem>Login</DropdownMenuItem>
                      </Link>
                      <Link href="/register">
                        <DropdownMenuItem>Register</DropdownMenuItem>
                      </Link>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              {session.status == "authenticated" && (
                <>
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
                      <Badge
                        variant="default"
                        className="absolute -top-3 -end-3"
                      >
                        {isWishlistLoading ? (
                          <Loader2 className="animate-spin m-px my-1" />
                        ) : (
                          wishlistData?.count
                        )}
                      </Badge>
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
