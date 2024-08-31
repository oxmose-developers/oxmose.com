"use client";

import { removeItem } from "./actions";
import { useFormState } from "react-dom";

export default function RemoveItem({
  merchandiseId,
}: {
  merchandiseId: string;
}) {
  const [message, formAction] = useFormState(removeItem, null);

  const actionWithVariant = formAction.bind(null, merchandiseId);

  return (
    <form action={actionWithVariant}>
      <button className="text-oxe-sm font-medium" type="submit">
        Remove
      </button>

      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
