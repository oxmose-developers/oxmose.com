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
      next: { tags: ["artists"] },
      cache: process.env.NODE_ENV === "development" ? "no-store" : undefined,
    },
  );

export const fetchArtistsStaticParams = async () =>
  client.fetch<ArtistsStaticParamsQuery>(
    ArtistsStaticParamsQuery,
    {},
    {
      next: { tags: ["artistsStaticParams"] },
      cache: process.env.NODE_ENV === "development" ? "no-store" : undefined,
    },
  );

export const fetchArtistPage = async ({ slug }: { slug: string }) =>
  client.fetch<ArtistPageQuery>(
    ArtistPageQuery,
    { slug },
    {
      next: { tags: [slug] },
      cache: process.env.NODE_ENV === "development" ? "no-store" : undefined,
    },
  );
