"use client";

import clsx from "clsx";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import type { Product } from "../../lib/shopify/types";
import Price from "./catalogue-price";

export type DigitalOrVinylProductVariant = {
  type: "Digital" | "Vinyl";
  product: Product;
  format: string;
};

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export default function VariantSelector({
  products,
}: {
  products: DigitalOrVinylProductVariant[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-1 flex-col gap-5">
      {products
        .filter(({ product }) =>
          product.variants.every((el) => el.availableForSale),
        )
        .map(({ product, type, format }) => {
          const optionNameLowerCase = "Format".toLowerCase();

          // Base option params on current params so we can preserve any other param state in the url.
          const optionSearchParams = new URLSearchParams(
            searchParams.toString(),
          );

          // Update the option params using the current option to reflect how the url *would* change,
          // if the option was clicked.
          optionSearchParams.set(optionNameLowerCase, type);
          const optionUrl = createUrl(pathname, optionSearchParams);

          // The option is active if it's in the url params.
          const isActive = searchParams.get(optionNameLowerCase) === type;

          return (
            <button
              key={product.id}
              className="group flex"
              onClick={() => {
                router.replace(optionUrl, { scroll: false });
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

                <p className="text-oxe-xxs truncate pl-6 text-left md:pl-9 md:text-oxe-sm">
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
          );
        })}
    </div>
  );
}
