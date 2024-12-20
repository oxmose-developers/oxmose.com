"use client";

import { useActionState, useEffect } from "react";

import type { CartItem } from "../../../lib/shopify/types";
import { updateItemQuantity } from "./actions";

export function EditItemQuantityButton({
  item,
  optimisticUpdate,
}: {
  item: CartItem;
  optimisticUpdate: any;
}) {
  const [message, formAction] = useActionState(updateItemQuantity, null);

  useEffect(() => {
    if (message) window.alert(message);
  }, [message]);

  const increaseAction = formAction.bind(null, {
    merchandiseId: item.merchandise.id,
    quantity: item.quantity + 1,
  });

  const decreaseAction = formAction.bind(null, {
    merchandiseId: item.merchandise.id,
    quantity: item.quantity - 1,
  });

  return (
    <div className="flex items-center text-oxe-xxs md:text-oxe-sm">
      <p className="mr-2">
        <span>Qty: </span>
      </p>

      <form
        action={async () => {
          optimisticUpdate(item.merchandise.id, "minus");
          await decreaseAction();
        }}
      >
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
        {`${item.quantity}`}
      </p>

      <form
        action={async () => {
          optimisticUpdate(item.merchandise.id, "plus");
          await increaseAction();
        }}
      >
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
