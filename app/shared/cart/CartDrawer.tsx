"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";
import RemoveItem from "./RemoveItem";

export default function CartDrawer({
  cart,
}: {
  cart: {
    checkoutUrl: string;
    total: string;
    lines: {
      merchandiseId: string;
      quantity: number;
      cost: string;
      title: string;
      image: string;
    }[];
  };
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed bottom-12 right-5 whitespace-nowrap bg-black p-2 px-3 text-oxe-sm font-medium uppercase text-white"
      >
        <span>{`Cart (${cart.lines.map((line) => line.quantity).reduce((a, b) => a + b, 0)})`}</span>
      </button>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full lg:pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col divide-y divide-black bg-white">
                  <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-4 lg:py-7">
                    <div className="border-b border-black px-6 pb-4 lg:px-9 lg:pb-7">
                      <div className="flex items-center justify-between">
                        <DialogTitle className="sr-only">Cart</DialogTitle>

                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative size-8 focus:outline-none lg:size-10"
                        >
                          <span className="sr-only">Close panel</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="size-8 lg:size-10"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="#000000"
                          >
                            <path d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="relative flex-1 divide-y divide-black px-6 lg:px-9">
                      {cart.lines.map((line) => (
                        <div
                          key={line.merchandiseId}
                          className="flex items-start gap-4 py-6 lg:py-7"
                        >
                          <Image
                            className="size-20 object-contain lg:size-24"
                            src={line.image}
                            alt={line.image}
                            width={96}
                            height={96}
                          />

                          <div>
                            <p className="text-oxe-xs font-medium lg:text-oxe-sm">
                              {line.title}
                            </p>

                            <p className="text-oxe-xs lg:text-oxe-sm">{`Qty: ${line.quantity}`}</p>

                            <p className="text-oxe-xs lg:text-oxe-sm">{`Price: ${line.cost}`}</p>

                            <RemoveItem merchandiseId={line.merchandiseId} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-shrink-0 justify-between gap-4 px-6 py-4 lg:px-9 lg:py-7">
                    <p className="text-oxe-sm lg:text-oxe-md">Total:</p>

                    <p className="text-oxe-sm lg:text-oxe-md">{cart.total}</p>
                  </div>

                  <div className="flex flex-shrink-0 justify-between gap-4 px-6 py-4 lg:px-9 lg:py-7">
                    <p className="text-oxe-xs">
                      {
                        "Shipping costs may apply for the physical product(s) and will be calculated upon checkout."
                      }
                    </p>
                  </div>

                  <a
                    className="w-full flex-shrink-0 bg-black px-6 py-4 text-center text-oxe-sm font-medium uppercase text-white lg:px-9 lg:py-7"
                    href={cart.checkoutUrl}
                  >
                    Checkout
                  </a>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
