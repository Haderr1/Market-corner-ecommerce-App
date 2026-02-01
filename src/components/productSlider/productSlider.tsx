"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ProductI } from "@/interfaces";
import Image from "next/image";

export default function ProductSlider({ products }: { products: ProductI }) {
  return (
    <>
      <div className="flex gap-1">
        <div className="flex flex-col">
          <Image
            className="object-cover aspect-square w-60 h-25 mb-2 rounded-lg"
            src={products.images[0]}
            alt={products.title}
            width={400}
            height={400}
          />
          <Image
            className="object-cover aspect-square  w-60 h-25 mb-2 rounded-lg"
            src={products.images[1]}
            alt={products.title}
            width={400}
            height={400}
          />
          <Image
            className="object-cover aspect-square w-60 h-25 mb-2 rounded-lg"
            src={products.images[2]}
            alt={products.title}
            width={400}
            height={400}
          />
        </div>
        <Carousel
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 1500,
            }),
          ]}
        >
          <CarouselContent>
            {products.images.map((img) => (
              <CarouselItem key={img}>
                <Image
                  className="object-cover w-full h-80"
                  src={img}
                  alt={products.title}
                  width={400}
                  height={400}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
}
