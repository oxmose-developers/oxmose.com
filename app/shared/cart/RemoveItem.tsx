"use client";

import { useFormState } from "react-dom";

import { removeItem } from "./actions";

export default function RemoveItem({
  merchandiseId,
}: {
  merchandiseId: string;
}) {
  const [message, formAction] = useFormState(removeItem, null);

  const actionWithVariant = formAction.bind(null, merchandiseId);

  return (
    <form action={actionWithVariant}>
      <button className="text-oxe-xs font-medium lg:text-oxe-sm" type="submit">
        Remove
      </button>

      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
