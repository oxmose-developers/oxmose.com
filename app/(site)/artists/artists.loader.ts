import { notFound } from "next/navigation";

import { NEXT_TAGS } from "../../../constants/tags";
import {
  ArtistPageQuery,
  ArtistsQuery,
  ArtistsStaticParamsQuery,
} from "../../../groq";
import { client } from "../../../lib/sanity";

export const fetchArtists = async () =>
  client.fetch<ArtistsQuery>(
    ArtistsQuery,
    {},
    {
      next: { tags: [NEXT_TAGS.ARTISTS] },
      cache:
        process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    },
  );

export const fetchArtistsStaticParams = async () =>
  client.fetch<ArtistsStaticParamsQuery>(
    ArtistsStaticParamsQuery,
    {},
    {
      next: { tags: [NEXT_TAGS.ARTISTS_STATIC_PARAMS] },
      cache:
        process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    },
  );

export const fetchArtistPage = async ({ slug }: { slug: string }) => {
  const data = await client.fetch<ArtistPageQuery>(
    ArtistPageQuery,
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
