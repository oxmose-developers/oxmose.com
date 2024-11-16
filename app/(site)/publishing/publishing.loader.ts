import { notFound } from "next/navigation";

import { NEXT_TAGS } from "../../../constants/tags";
import {
  PublishingArtistPageQuery,
  PublishingArtistsQuery,
  PublishingArtistsStaticParamsQuery,
  PublishingQuery,
} from "../../../groq";
import { client } from "../../../lib/sanity";

export const fetchPublishingPage = async () => {
  return client.fetch<PublishingQuery>(
    PublishingQuery,
    {},
    {
      next: { tags: [NEXT_TAGS.PUBLISHING] },
      cache:
        process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    },
  );
};

export const fetchPublishingArtists = async () => {
  return client.fetch<PublishingArtistsQuery>(
    PublishingArtistsQuery,
    {},
    {
      next: { tags: [NEXT_TAGS.PUBLISHING_ARTISTS] },
      cache:
        process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    },
  );
};

export const fetchPublishingArtistsStaticParams = async () => {
  return client.fetch<PublishingArtistsStaticParamsQuery>(
    PublishingArtistsStaticParamsQuery,
    {},
    {
      next: { tags: [NEXT_TAGS.PUBLISHING_ARTISTS_STATIC_PARAMS] },
      cache:
        process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    },
  );
};

export const fetchPublishingArtistPage = async ({ slug }: { slug: string }) => {
  const data = await client.fetch<PublishingArtistPageQuery>(
    PublishingArtistPageQuery,
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
