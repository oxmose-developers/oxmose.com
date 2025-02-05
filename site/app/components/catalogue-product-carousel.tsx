"use client";

import Image from "next/image";
import { useState } from "react";
import type { Image as SanityImage } from "sanity";

import { urlForImage } from "../../lib/sanity";
import type { SanityImageAsset } from "../../sanity.types";

export function ProductCarousel({
  productImages,
}: {
  productImages: (SanityImage & {
    asset: SanityImageAsset;
  })[];
}) {
  const [activeIndex, activeIndexSet] = useState(0);

  return (
    <div className="flex flex-1 gap-10 md:mt-[--release-gap] md:p-10">
      {/* Desktop Product Images */}
      <div className="mt-auto flex max-w-[56rem] flex-1 snap-x snap-mandatory overflow-x-auto">
        <Image
          key={activeIndex}
          loading="lazy"
          className="aspect-square shrink-0 snap-center object-cover object-center"
          src={urlForImage(productImages[activeIndex])
            .width(896)
            .height(896)
            .dpr(2)
            .url()}
          width={896}
          height={896}
          alt=""
          draggable={false}
        />
      </div>

      {/* Carousel Controls */}
      <div
        className="flex shrink-0 gap-2 self-end justify-self-end"
        onMouseLeave={() => activeIndexSet(0)}
      >
        {productImages.slice(1).map((image, idx) => (
          <div
            key={`carousel-${idx}`}
            onMouseEnter={() => activeIndexSet(idx + 1)}
            className="cursor-pointer"
          >
            <Image
              loading="lazy"
              className="aspect-square size-11 shrink-0"
              src={urlForImage(image).width(44).height(44).dpr(2).url()}
              width={44}
              height={44}
              alt=""
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductFullBleedScroller({
  productImages,
}: {
  productImages: (SanityImage & {
    asset: SanityImageAsset;
  })[];
}) {
  return (
    <div className="relative flex aspect-square w-full snap-x snap-mandatory overflow-x-auto">
      {productImages.map((image, idx) => (
        <Image
          alt=""
          className="aspect-square shrink-0 snap-center object-cover object-center"
          draggable={false}
          height={768}
          key={`full-bleed-${idx}`}
          loading="lazy"
          sizes="100vw"
          src={urlForImage(image).width(768).height(768).dpr(2).url()}
          width={768}
        />
      ))}
    </div>
  );
}
