"use client";

import { useSearchParams } from "next/navigation";

import AddToCart from "./catalogue-add-to-cart";
import type { DigitalOrVinylProductVariant } from "./catalogue-variant-selector";

export default function BuyButton({
  products,
  defaultProduct,
}: {
  products: DigitalOrVinylProductVariant[];
  defaultProduct: DigitalOrVinylProductVariant;
}) {
  const searchParams = useSearchParams();

  let format = searchParams.get("format");

  format ??= "Digital";

  /**
   * Take product from url params if it exists, otherwise take the default digital product
   */
  const digitalOrVinylProduct =
    products.find((product) => format === product.type) || defaultProduct;

  return (
    <AddToCart
      digitalOrVinylProduct={digitalOrVinylProduct}
      selectedProductFormat={format as "Digital" | "Vinyl"}
    />
  );
}
