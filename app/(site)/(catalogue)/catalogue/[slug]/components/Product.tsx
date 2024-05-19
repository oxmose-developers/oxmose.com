import { Suspense } from "react";

import { getProduct } from "../../../../../../lib/shopify";
import AddToCart from "./AddToCart";
import Price from "./Price";

export default async function Product({
  handle,
  type,
}: {
  handle: string;
  type: "Vinyl" | "Digital";
}) {
  const product = await getProduct(handle);

  if (!product) {
    return null;
  }

  return (
    <div>
      <div className="flex">
        <p className="text-oxe-sm font-medium uppercase">{type}</p>

        <Price
          className="ml-auto text-oxe-sm font-medium uppercase"
          amount={product.priceRange.maxVariantPrice.amount}
          currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          hideCurrencyCode
        />
      </div>

      <p>{product.title}</p>

      <Suspense fallback={null}>
        <AddToCart
          variants={product.variants}
          availableForSale={product.availableForSale}
        />
      </Suspense>
    </div>
  );
}
