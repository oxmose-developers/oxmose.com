import { notFound } from "next/navigation";

import { NEXT_TAGS } from "../../../constants/tags";
import { FAQsQuery } from "../../../groq";
import { client } from "../../../lib/sanity";

export const fetchFaqs = async () =>
  client.fetch<FAQsQuery>(
    FAQsQuery,
    {},
    {
      next: { tags: [NEXT_TAGS.FAQ] },
      cache:
        process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    },
  );

export const fetchFaq = async ({ slug }: { slug: string }) => {
  const faqs = await fetchFaqs();

  const faq = faqs.find((el) => el.slug.current === slug);

  if (!faq) {
    return notFound();
  }

  return faq;
};
