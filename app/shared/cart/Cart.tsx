import { cookies } from "next/headers";

import { getCart } from "../../../lib/shopify";

export default async function Cart() {
  const cartId = cookies().get("cartId")?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (cart) {
    return (
      <div className="relative whitespace-nowrap text-oxe-sm font-medium uppercase">
        <span>{`Cart ${cart?.totalQuantity && `(${cart.totalQuantity})`}`}</span>
      </div>
    );
  }

  return null;
}
