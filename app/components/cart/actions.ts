"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

import { NEXT_TAGS } from "../../../constants/tags";
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from "../../../lib/shopify";

export async function addItem(
  prevState: any,
  {
    selectedVariantId,
    activeProductFormat,
  }: {
    selectedVariantId: string | undefined;
    activeProductFormat: "Digital" | "Vinyl";
  },
) {
  let cartId = (await cookies()).get("cartId")?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart();
    cartId = cart.id;
    (await cookies()).set("cartId", cartId as string);
  }

  if (!selectedVariantId) {
    return "Missing product variant ID";
  }

  try {
    if (
      cart.lines.find(
        (line) =>
          line.merchandise.id === selectedVariantId &&
          activeProductFormat === "Digital",
      )
    ) {
      return "Item already in cart";
    }

    await addToCart(cartId, [
      { merchandiseId: selectedVariantId, quantity: 1 },
    ]);

    revalidateTag(NEXT_TAGS.CART);
  } catch (e) {
    return "Error adding item to cart";
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  const cartId = (await cookies()).get("cartId")?.value;

  if (!cartId) {
    return "Missing cart ID";
  }

  try {
    const cart = await getCart(cartId);

    if (!cart) {
      return "Error fetching cart";
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId,
    );

    if (lineItem && lineItem.id) {
      await removeFromCart(cartId, [lineItem.id]);
      revalidateTag(NEXT_TAGS.CART);
    } else {
      return "Item not found in cart";
    }

    return "Removed item";
  } catch (e) {
    console.error(e);

    return "Error removing item from cart";
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  },
) {
  const cartId = (await cookies()).get("cartId")?.value;

  if (!cartId) {
    return "Missing cart ID";
  }

  try {
    const cart = await getCart(cartId);

    if (!cart) {
      return "Error fetching cart";
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === payload.merchandiseId,
    );

    if (!(lineItem && lineItem.id)) {
      return "Item not found in cart";
    }

    if (payload.quantity === 0) {
      await removeFromCart(cartId, [lineItem.id]);

      revalidateTag(NEXT_TAGS.CART);

      return "Removed item";
    }

    await updateCart(cartId, [
      {
        id: lineItem.id,
        merchandiseId: payload.merchandiseId,
        quantity: payload.quantity,
      },
    ]);

    revalidateTag(NEXT_TAGS.CART);

    return "Updated item quantity";
  } catch (e) {
    return "Error updating item quantity";
  }
}
