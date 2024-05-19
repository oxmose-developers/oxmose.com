import { NEXT_TAGS } from "../../../constants/tags";
import { AboutQuery } from "../../../groq";
import { client } from "../../../lib/sanity";

export const fetchAboutPage = async () =>
  client.fetch<AboutQuery>(
    AboutQuery,
    {},
    {
      next: { tags: [NEXT_TAGS.ABOUT] },
      cache:
        process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    },
  );
