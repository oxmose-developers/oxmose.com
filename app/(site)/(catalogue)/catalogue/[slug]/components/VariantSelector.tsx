"use client";

import clsx from "clsx";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import type { Product } from "../../../../../../lib/shopify/types";
import Price from "./Price";

export type ProductVariant = {
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
  products: ProductVariant[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-1 flex-col gap-5">
      {products.map(({ product, type, format }) => {
        const optionNameLowerCase = "Format".toLowerCase();

        // Base option params on current params so we can preserve any other param state in the url.
        const optionSearchParams = new URLSearchParams(searchParams.toString());

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
              <div className="flex items-center gap-1.5 lg:gap-4">
                <div
                  className={clsx(
                    "-mt-[3px] size-4 rounded-full border lg:size-5",
                    isActive
                      ? "border-black bg-black"
                      : "border-black bg-white group-hover:bg-black",
                  )}
                ></div>

                <p className="text-oxe-sm/5 font-medium uppercase lg:text-[35px]/[32px]">
                  {type}
                </p>
              </div>

              <p className="truncate pl-6 text-oxe-xs lg:pl-9 lg:text-oxe-sm">
                {format}
              </p>
            </div>

            <Price
              className="ml-auto text-oxe-sm/5 font-medium uppercase lg:text-[35px]/[32px]"
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
