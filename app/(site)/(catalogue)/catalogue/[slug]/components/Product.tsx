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
    <div className="group">
      <div className="flex">
        <div>
          <div className="flex items-center gap-1.5 lg:gap-4">
            <div className="-mt-[3px] size-4 rounded-full border border-black bg-white group-hover:bg-black lg:size-5"></div>

            <p className="text-[35px]/[32px] font-medium uppercase">{type}</p>
          </div>

          <p className="truncate pl-9 text-oxe-sm">{product.handle}</p>
        </div>

        <Price
          className="ml-auto text-[35px]/[32px] font-medium uppercase"
          amount={product.priceRange.maxVariantPrice.amount}
          currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          hideCurrencyCode
        />
      </div>

      <Suspense fallback={null}>
        <AddToCart
          variants={product.variants}
          availableForSale={product.availableForSale}
        />
      </Suspense>
    </div>
  );
}
