import { useActionState } from "react";
("use client");

import { useFormStatus } from "react-dom";

import type { ProductVariant } from "../../lib/shopify/types";
import { addItem } from "./cart/actions";

export function SubmitButton({
  children,
  disabled,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      className="block text-oxe-sm font-medium uppercase disabled:opacity-50"
      disabled={disabled}
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
  availableForSale,
  activeProductFormat,
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
  activeProductFormat: "Digital" | "Vinyl";
}) {
  const [message, formAction] = useActionState(addItem, null);

  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;

  const selectedVariantId = defaultVariantId;

  const actionWithVariant = formAction.bind(null, {
    selectedVariantId,
    activeProductFormat,
  });

  return (
    <form action={actionWithVariant}>
      <SubmitButton disabled={!availableForSale}>Buy</SubmitButton>

      <p aria-live="polite" role="status">
        {message}
      </p>
    </form>
  );
}
