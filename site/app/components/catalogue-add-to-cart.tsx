"use client";

import { useActionState, useEffect } from "react";

import { useCart } from "../../context/cart-context";
import { addItem } from "./cart/actions";
import type { DigitalOrVinylProductVariant } from "./catalogue-variant-selector";

export function SubmitButton({
  children,
  availableForSale,
}: React.PropsWithChildren<{
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}>) {
  const buttonClasses =
    "block text-oxe-sm font-medium uppercase disabled:opacity-50";

  if (!availableForSale) {
    return (
      <button disabled className={buttonClasses}>
        Out Of Stock
      </button>
    );
  }

  return (
    <button className={buttonClasses} aria-label="Add to cart">
      {children}
    </button>
  );
}

export default function AddToCart({
  digitalOrVinylProduct,
  selectedProductFormat,
}: {
  digitalOrVinylProduct: DigitalOrVinylProductVariant;
  selectedProductFormat: "Digital" | "Vinyl";
}) {
  const { addCartItem } = useCart();

  const [message, formAction] = useActionState(addItem, null);

  useEffect(() => {
    if (message) globalThis.alert(message);
  }, [message]);

  const defaultVariantId =
    digitalOrVinylProduct.product.variants.length === 1
      ? digitalOrVinylProduct.product.variants[0]?.id
      : undefined;
  const selectedVariantId = defaultVariantId;
  const actionWithVariant = formAction.bind(null, {
    selectedVariantId,
    selectedProductFormat,
  });
  const finalVariant = digitalOrVinylProduct.product.variants.find(
    (variant) => variant.id === selectedVariantId,
  )!;

  return (
    <form
      action={async () => {
        addCartItem(
          finalVariant,
          digitalOrVinylProduct.product,
          selectedProductFormat,
        );
        await actionWithVariant();
      }}
    >
      <SubmitButton
        availableForSale={digitalOrVinylProduct.product.availableForSale}
        selectedVariantId={selectedVariantId}
      >
        Buy
      </SubmitButton>

      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
