import { redirect } from "next/navigation";

import { fetchFaqs } from "./loader";

export const dynamic = "force-static";

export default async function Page() {
  const faqs = await fetchFaqs();

  const firstFaq = faqs[0];

  return redirect(`/faq/${firstFaq.slug.current}`);
}
