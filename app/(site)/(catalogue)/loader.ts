import { ReleasesQuery } from "../../../groq";
import { client } from "../../../lib/sanity";

export const fetchReleases = async () =>
  client.fetch<ReleasesQuery>(
    ReleasesQuery,
    {},
    {
      next: { tags: ["releases"] },
      cache: process.env.NODE_ENV === "development" ? "no-store" : undefined,
    },
  );
