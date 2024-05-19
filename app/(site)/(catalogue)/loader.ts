import { NEXT_TAGS } from "../../../constants/tags";
import {
  ReleasePageQuery,
  ReleasesQuery,
  ReleasesStaticParamsQuery,
} from "../../../groq";
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

export const fetchReleasePage = async ({ slug }: { slug: string }) =>
  client.fetch<ReleasePageQuery>(
    ReleasePageQuery,
    { slug },
    {
      next: { tags: [slug] },
      cache:
        process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    },
  );

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
