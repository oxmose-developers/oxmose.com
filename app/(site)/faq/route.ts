import { redirect } from "next/navigation";

import { FAQsQuery } from "../../../groq";
import { client } from "../../../lib/sanity";

export async function GET() {
  const faqs = await client.fetch<FAQsQuery>(FAQsQuery);

  const firstFaq = faqs[0];

  redirect(`/faq/${firstFaq.slug.current}`);
}
