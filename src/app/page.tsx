import { Button } from "@/components/ui/button";
import Image from "next/image";
import hero1 from "../../public/images/hero1.png";
import Link from "next/link";

export default function Home() {
  return (
    <section
      className="
        relative overflow-hidden
        h-[80vh] min-h-screen
        -mx-24 -my-8
      "
    >
      <Image
        src={hero1}
        alt="MarketCorner Hero"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-white/60" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4 md:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-4">
          Discover Your Style
        </h1>

        <p className="text-muted-foreground max-w-xl mb-6">
          Shop the latest products with the best prices and premium quality
        </p>

        <Button size="lg">
          <Link href="/products" >Shop Now</Link>
        </Button>
      </div>
    </section>
  );
}
