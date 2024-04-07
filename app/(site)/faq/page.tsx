import { redirect } from "next/navigation";

import { FAQsQuery } from "../../../groq";
import { client } from "../../../lib/sanity";

export default async function Page() {
  const faqs = await client.fetch<FAQsQuery>(FAQsQuery);

  const firstFaq = faqs[0];

  return redirect(`/faq/${firstFaq.slug.current}`);
}
