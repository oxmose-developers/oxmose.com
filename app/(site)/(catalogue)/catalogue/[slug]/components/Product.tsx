import { Suspense } from "react";

import { getProduct } from "../../../../../../lib/shopify";
import AddToCart from "./AddToCart";
import Price from "./Price";

export default async function Product({
  handle,
  type,
  productFormat,
}: {
  handle: string;
  type: "Vinyl" | "Digital";
  productFormat: string;
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

            <p className="text-oxe-sm/5 font-medium uppercase lg:text-[35px]/[32px]">
              {type}
            </p>
          </div>

          <p className="truncate pl-6 text-oxe-xs lg:pl-9 lg:text-oxe-sm">
            {productFormat}
          </p>
        </div>

        <Price
          className="ml-auto text-oxe-sm/5 font-medium uppercase lg:text-[35px]/[32px]"
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
