import { notFound } from "next/navigation";

import { NEXT_TAGS } from "../../constants/tags";
import {
  ReleasePageQuery,
  ReleasesQuery,
  ReleasesStaticParamsQuery,
} from "../../groq";
import { client } from "./client";

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

export const fetchReleasePage = async ({ slug }: { slug: string }) => {
  const data = await client.fetch<ReleasePageQuery>(
    ReleasePageQuery,
    { slug },
    {
      next: { tags: [slug] },
      cache:
        process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    },
  );

  if (!data) {
    return notFound();
  }

  return data;
};

export const fetchReleasesStaticParams = async () =>
  client.fetch<ReleasesStaticParamsQuery>(
    ReleasesStaticParamsQuery,
    {},
    {
      next: { tags: [NEXT_TAGS.RELEASES_STATIC_PARAMS] },
      cache:
        process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    },
  );
