"use client";

import { useActionState, useEffect } from "react";

import type { CartItem } from "../../../lib/shopify/types";
import { removeItem } from "./actions";

export function DeleteItemButton({
  item,
  optimisticUpdate,
}: {
  item: CartItem;
  optimisticUpdate: any;
}) {
  const [message, formAction] = useActionState(removeItem, null);

  useEffect(() => {
    if (message) window.alert(message);
  }, [message]);

  const merchandiseId = item.merchandise.id;
  const actionWithVariant = formAction.bind(null, merchandiseId);

  return (
    <form
      action={async () => {
        optimisticUpdate(merchandiseId, "delete");
        await actionWithVariant();
      }}
    >
      <button
        className="text-oxe-xxs font-medium md:text-oxe-sm"
        aria-label="Remove cart item"
        type="submit"
      >
        Remove
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
