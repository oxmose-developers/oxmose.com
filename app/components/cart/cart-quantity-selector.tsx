"use client";

import { useActionState } from "react";

import { updateItemQuantity } from "./actions";
import type { CartLineItem } from "./cart-element";

export default function QuantitySelectorItem({ line }: { line: CartLineItem }) {
  const [message, formAction] = useActionState(updateItemQuantity, null);

  const increaseAction = formAction.bind(null, {
    merchandiseId: line.merchandiseId,
    quantity: line.quantity + 1,
  });

  const decreaseAction = formAction.bind(null, {
    merchandiseId: line.merchandiseId,
    quantity: line.quantity - 1,
  });

  return (
    <div className="flex items-center text-oxe-xs md:text-oxe-sm">
      <p className="mr-2">
        <span>Qty: </span>
      </p>

      <form action={decreaseAction}>
        <button
          type="submit"
          className="size-[1.5625rem] font-medium hover:bg-black hover:text-white md:size-[2.125rem]"
        >
          <span className="sr-only">Decrease</span>
          <span>-</span>
        </button>

        <p aria-live="polite" className="sr-only" role="status">
          {message}
        </p>
      </form>

      <p className="size-[1.5625rem] text-center md:size-[2.125rem]">
        {`${line.quantity}`}
      </p>

      <form action={increaseAction}>
        <button
          type="submit"
          className="size-[1.5625rem] font-medium hover:bg-black hover:text-white md:size-[2.125rem]"
        >
          <span className="sr-only">Increase</span>
          <span>+</span>
        </button>

        <p aria-live="polite" className="sr-only" role="status">
          {message}
        </p>
      </form>
    </div>
  );
}
