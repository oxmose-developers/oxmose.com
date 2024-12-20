"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { hasAtLeast } from "remeda";

import { useCart } from "../../../context/cart-context";
import { DEFAULT_OPTION } from "../../../lib/constants";
import LoadingDots from "../loading-dots";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartDrawer() {
  const { cart, updateCartItem } = useCart();
  const [open, openSet] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      quantityRef.current = cart?.totalQuantity;
    }
  }, [open, cart?.totalQuantity, quantityRef]);

  return (
    <>
      <button
        type="button"
        onClick={() => openSet(!open)}
        data-show-cart={cart && hasAtLeast(cart.lines, 1)}
        className="invisible fixed bottom-20 right-5 inline-flex h-10 items-center whitespace-nowrap bg-black px-3 text-oxe-xxs font-medium uppercase text-white data-[show-cart=true]:visible dark:bg-white dark:text-black md:bottom-24 md:h-14 md:px-4 md:text-oxe-sm"
      >
        <span>
          {quantityRef.current ? `Cart (${quantityRef.current})` : "Cart"}
        </span>
      </button>

      <Dialog open={open} onClose={openSet} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full md:pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col divide-y divide-black bg-white text-black">
                  <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-4 md:py-7">
                    <div className="border-b border-black px-6 pb-4 md:px-9 md:pb-7">
                      <div className="flex items-center justify-between">
                        <DialogTitle className="sr-only">Cart</DialogTitle>

                        <button
                          type="button"
                          onClick={() => openSet(false)}
                          className="relative size-8 focus:outline-none md:size-10"
                        >
                          <span className="sr-only">Close panel</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="size-8 md:size-10"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="#000000"
                          >
                            <path d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="relative flex-1 divide-y divide-black px-6 md:px-9">
                      {cart &&
                        hasAtLeast(cart.lines, 1) &&
                        cart.lines
                          .sort((a, b) =>
                            a.merchandise.product.title.localeCompare(
                              b.merchandise.product.title,
                            ),
                          )
                          .map((item, i) => {
                            const merchandiseSearchParams =
                              {} as MerchandiseSearchParams;

                            item.merchandise.selectedOptions.forEach(
                              ({ name, value }) => {
                                if (value !== DEFAULT_OPTION) {
                                  merchandiseSearchParams[name.toLowerCase()] =
                                    value;
                                }
                              },
                            );

                            return (
                              <div
                                key={i}
                                className="flex items-start gap-4 py-6 md:py-7"
                              >
                                <Image
                                  className="size-20 object-contain md:size-24"
                                  src={
                                    item.merchandise.product.featuredImage.url
                                  }
                                  alt={
                                    item.merchandise.product.featuredImage
                                      .altText || item.merchandise.product.title
                                  }
                                  width={96}
                                  height={96}
                                  priority
                                />

                                <div>
                                  <p className="text-oxe-xxs font-medium md:text-oxe-sm">
                                    {item.merchandise.product.title}
                                  </p>

                                  <EditItemQuantityButton
                                    item={item}
                                    optimisticUpdate={updateCartItem}
                                  />

                                  <p className="text-oxe-xxs md:text-oxe-sm">{`Price: ${new Intl.NumberFormat(
                                    "fr-FR",
                                    {
                                      style: "currency",
                                      currency:
                                        item.cost.totalAmount.currencyCode,
                                    },
                                  ).format(
                                    parseFloat(item.cost.totalAmount.amount),
                                  )}`}</p>

                                  <DeleteItemButton
                                    item={item}
                                    optimisticUpdate={updateCartItem}
                                  />
                                </div>
                              </div>
                            );
                          })}
                    </div>
                  </div>

                  <div className="flex flex-shrink-0 justify-between gap-4 px-6 py-4 md:px-9 md:py-7">
                    <p className="text-oxe-sm md:text-oxe-md">Total:</p>

                    <p className="text-oxe-sm md:text-oxe-md">
                      {cart &&
                        hasAtLeast(cart.lines, 1) &&
                        new Intl.NumberFormat("fr-FR", {
                          style: "currency",
                          currency: cart.cost.totalAmount.currencyCode,
                        }).format(parseFloat(cart.cost.totalAmount.amount))}
                    </p>
                  </div>

                  <div className="flex flex-shrink-0 justify-between gap-4 px-6 py-4 md:px-9 md:py-7">
                    <p className="text-oxe-xxs">
                      {
                        "Shipping costs may apply for the physical product(s) and will be calculated upon checkout."
                      }
                    </p>
                  </div>

                  {cart && hasAtLeast(cart.lines, 1) && (
                    <form action={redirectToCheckout}>
                      <CheckoutButton />
                    </form>
                  )}
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-full flex-shrink-0 bg-black px-6 py-4 text-center text-oxe-sm font-medium uppercase text-white md:px-9 md:py-7"
      type="submit"
      disabled={pending}
    >
      {pending ? <LoadingDots className="bg-white" /> : "Checkout"}
    </button>
  );
}
