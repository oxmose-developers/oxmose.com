"use client";

import { useFormState, useFormStatus } from "react-dom";

import type { ProductVariant } from "../../../../../../lib/shopify/types";
import { addItem } from "../../../../../shared/cart/actions";

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="block text-oxe-sm font-medium uppercase"
      aria-disabled={pending}
      aria-label="Add to cart"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}

export default function AddToCart({
  variants,
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
}) {
  const [message, formAction] = useFormState(addItem, null);

  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;

  const selectedVariantId = defaultVariantId;

  const actionWithVariant = formAction.bind(null, selectedVariantId);

  return (
    <form action={actionWithVariant}>
      <SubmitButton>Buy</SubmitButton>

      <p aria-live="polite" role="status">
        {message}
      </p>
    </form>
  );
}
