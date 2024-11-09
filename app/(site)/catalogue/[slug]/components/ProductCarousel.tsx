/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import type { Image } from "sanity";

import { urlForImage } from "../../../../../../lib/sanity";

export function ProductCarousel({ productImages }: { productImages: Image[] }) {
  const [activeIndex, activeIndexSet] = useState(0);

  const images = productImages.map((image) => ({
    _key: image._key as string,
    src: urlForImage(image).url(),
    webp: urlForImage(image).format("webp").url(),
  }));

  return (
    <div className="flex flex-1 gap-10 lg:p-10">
      {/* Desktop Product Images */}
      <div className="mt-auto flex max-w-[40rem] flex-1 snap-x snap-mandatory overflow-x-auto">
        <img
          alt={""}
          className="aspect-square shrink-0 snap-center object-cover object-center"
          decoding="async"
          loading="lazy"
          src={images[activeIndex].webp}
        />
      </div>

      {/* Carousel Controls */}
      <div className="flex shrink-0 gap-2 self-end justify-self-end">
        {images
          .filter((_, idx) => idx !== activeIndex)
          .map(({ webp, _key }, idx) => (
            <button
              key={_key}
              type="button"
              onClick={() => activeIndexSet(idx)}
            >
              <img
                alt={""}
                className="aspect-square size-11 shrink-0"
                decoding="async"
                loading="lazy"
                src={webp}
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
  productImages: Image[];
}) {
  const images = productImages.map((image) => ({
    _key: image._key as string,
    src: urlForImage(image).url(),
    webp: urlForImage(image).format("webp").url(),
  }));

  return (
    <div className="relative flex aspect-square w-full snap-x snap-mandatory overflow-x-auto">
      {images.map(({ webp, _key }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={""}
          className="aspect-square shrink-0 snap-center object-cover object-center"
          decoding="async"
          key={_key}
          loading="lazy"
          src={webp}
        />
      ))}
    </div>
  );
}
