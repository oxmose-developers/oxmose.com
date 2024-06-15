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
      <div className="fixed right-0 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black text-oxe-sm font-medium uppercase text-white">
        <span>{`Cart ${cart?.totalQuantity && `(${cart.totalQuantity})`}`}</span>
      </div>
    );
  }

  return null;
}
