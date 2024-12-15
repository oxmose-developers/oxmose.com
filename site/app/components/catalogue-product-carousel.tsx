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
    <div className="flex flex-1 gap-10 md:p-10">
      {/* Desktop Product Images */}
      <div className="mt-auto flex max-w-[40rem] flex-1 snap-x snap-mandatory overflow-x-auto">
        <Image
          key={activeIndex}
          loading="lazy"
          className="aspect-square shrink-0 snap-center object-cover object-center"
          src={urlForImage(productImages[activeIndex])
            .width(640)
            .height(640)
            .dpr(3)
            .url()}
          width={640}
          height={640}
          alt={""}
          draggable={false}
          placeholder="blur"
          blurDataURL={productImages[activeIndex].asset.metadata?.lqip}
        />
      </div>

      {/* Carousel Controls */}
      <div className="flex shrink-0 gap-2 self-end justify-self-end">
        {productImages
          // .filter((_, idx) => idx !== activeIndex)
          .map((image, idx) => (
            <button
              key={`carousel-${idx}`}
              type="button"
              onClick={() => activeIndexSet(idx)}
            >
              <Image
                loading="lazy"
                className="aspect-square size-11 shrink-0"
                src={urlForImage(image).width(44).height(44).dpr(3).url()}
                width={44}
                height={44}
                alt={""}
                draggable={false}
                placeholder="blur"
                blurDataURL={image.asset.metadata?.lqip}
              />
            </button>
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
          alt={""}
          blurDataURL={image.asset.metadata?.lqip}
          className="aspect-square shrink-0 snap-center object-cover object-center"
          draggable={false}
          height={768}
          key={`full-bleed-${idx}`}
          loading="lazy"
          placeholder="blur"
          sizes="100vw"
          src={urlForImage(image).width(768).height(768).dpr(3).url()}
          width={768}
        />
      ))}
    </div>
  );
}
