import { cookies } from "next/headers";

import { getCart } from "../../../lib/shopify";
import CartDrawer from "./CartDrawer";

export default async function Cart() {
  const cartId = cookies().get("cartId")?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (cart) {
    const cartDetails = {
      checkoutUrl: cart.checkoutUrl,
      total: new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: cart.cost.totalAmount.currencyCode,
      }).format(parseFloat(cart.cost.totalAmount.amount)),
      lines: cart.lines.map((line) => ({
        merchandiseId: line.merchandise.id,
        id: line.merchandise.product.handle,
        quantity: line.quantity,
        cost: new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: line.cost.totalAmount.currencyCode,
        }).format(parseFloat(line.cost.totalAmount.amount)),
        title: line.merchandise.product.title,
        image: line.merchandise.product.featuredImage.url,
      })),
    };

    return <CartDrawer cart={cartDetails} />;
  }

  return null;
}
