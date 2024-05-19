import { FAQsQuery } from "../../../groq";
import { client } from "../../../lib/sanity";

export const fetchFaqs = async () =>
  client.fetch<FAQsQuery>(
    FAQsQuery,
    {},
    {
      next: { tags: ["faq"] },
      cache: process.env.NODE_ENV === "development" ? "no-store" : undefined,
    },
  );
