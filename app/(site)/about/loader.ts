import { AboutQuery } from "../../../groq";
import { client } from "../../../lib/sanity";

export const fetchAboutPage = async () =>
  client.fetch<AboutQuery>(
    AboutQuery,
    {},
    {
      next: { tags: ["about"] },
      cache: process.env.NODE_ENV === "development" ? "no-store" : undefined,
    },
  );
