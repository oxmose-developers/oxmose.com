"use client";

import { useSearchParams } from "next/navigation";

import AddToCart from "./AddToCart";
import type { ProductVariant } from "./VariantSelector";

export default function BuyButton({
  products,
  defaultProduct,
}: {
  products: ProductVariant[];
  defaultProduct: ProductVariant;
}) {
  const searchParams = useSearchParams();

  let format = searchParams.get("format");

  format ??= "Digital";

  /**
   * Take product from url params if it exists, otherwise take the default digital product
   */
  const productVariant =
    products.find((product) => format === product.type) || defaultProduct;

  return (
    <AddToCart
      variants={productVariant.product.variants}
      availableForSale={productVariant.product.availableForSale}
      activeProductFormat={format as "Digital" | "Vinyl"}
    />
  );
}
