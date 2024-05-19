import { cookies } from "next/headers";

import { getCart } from "../../../lib/shopify";

export default async function Cart() {
  const cartId = cookies().get("cartId")?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  return (
    <div>
      <h2>Cart</h2>

      <pre>
        <code>{JSON.stringify({ ...cart }, null, 2)}</code>
      </pre>
    </div>
  );
}
