"use client";

import clsx from "clsx";

import { useProduct, useUpdateURL } from "../../context/product-context";
import type { Product } from "../../lib/shopify/types";
import Price from "./catalogue-price";

export type DigitalOrVinylProductVariant = {
  type: "Digital" | "Vinyl";
  product: Product;
  format: string;
};

export default function VariantSelector({
  products,
}: {
  products: DigitalOrVinylProductVariant[];
}) {
  const { state, updateOption } = useProduct();
  const updateUrl = useUpdateURL();

  return (
    <div className="flex-1 space-y-5">
      {products
        .filter(({ product }) =>
          product.variants.every((el) => el.availableForSale),
        )
        .map(({ product, type, format }) => {
          /**
           * Hardcoded to format as thats the only option we have right now
           */
          const optionNameLowerCase = "Format".toLowerCase();

          const isActive = state[optionNameLowerCase] === type;

          return (
            <form key={product.id}>
              <button
                className="group flex w-full"
                formAction={() => {
                  const newState = updateOption(optionNameLowerCase, type);
                  updateUrl(newState);
                }}
              >
                <div>
                  <div className="flex items-center gap-1.5 md:gap-4">
                    <div
                      className={clsx(
                        "-mt-[0.1875rem] size-4 rounded-full border md:size-5",
                        isActive
                          ? "border-black bg-black"
                          : "border-black bg-white group-hover:bg-black",
                      )}
                    ></div>

                    <p className="text-oxe-sm/5 font-medium uppercase md:text-oxe-lg/8">
                      {type}
                    </p>
                  </div>

                  <p className="truncate pl-6 text-left text-oxe-xxs md:pl-9 md:text-oxe-sm">
                    {format}
                  </p>
                </div>

                <Price
                  className="ml-auto text-oxe-sm/5 font-medium uppercase md:text-oxe-lg/8"
                  amount={product.priceRange.maxVariantPrice.amount}
                  currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                  hideCurrencyCode
                />
              </button>
            </form>
          );
        })}
    </div>
  );
}
