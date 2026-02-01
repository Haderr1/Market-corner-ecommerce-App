import {
  Facebook,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      {/* Top */}
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex justify-between items-start">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">MarketCorner</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Discover quality products, curated brands, and the best shopping
              experience in one place.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm font-medium">Shop</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>
                  <Link href="/products" className="hover:text-foreground">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-foreground">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/brands" className="hover:text-foreground">
                    Brands
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Support</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <p className="text-sm font-medium">Follow us</p>
            <div className="flex gap-3">
              <a className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-muted transition">
                <FacebookIcon />{" "}
              </a>
              <a className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-muted transition">
                <InstagramIcon />{" "}
              </a>
              <a className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-muted transition">
                <TwitterIcon />{" "}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © 2026 MarketCorner. All rights reserved.
      </div>
    </footer>
  );
}
