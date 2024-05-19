import { NEXT_TAGS } from "../../../constants/tags";
import { ReleasesQuery } from "../../../groq";
import { client } from "../../../lib/sanity";

export const fetchReleases = async () =>
  client.fetch<ReleasesQuery>(
    ReleasesQuery,
    {},
    {
      next: { tags: [NEXT_TAGS.RELEASES] },
      cache:
        process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    },
  );
