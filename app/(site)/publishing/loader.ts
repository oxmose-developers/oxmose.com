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
      next: { tags: ["publishing"] },
      cache: process.env.NODE_ENV === "development" ? "no-store" : undefined,
    },
  );
};

export const fetchPublishingArtists = async () => {
  return client.fetch<PublishingArtistsQuery>(
    PublishingArtistsQuery,
    {},
    {
      next: { tags: ["publishingArtists"] },
      cache: process.env.NODE_ENV === "development" ? "no-store" : undefined,
    },
  );
};

export const fetchPublishingArtistsStaticParams = async () => {
  return client.fetch<PublishingArtistsStaticParamsQuery>(
    PublishingArtistsStaticParamsQuery,
    {},
    {
      next: { tags: ["publishingArtistsStaticParams"] },
      cache: process.env.NODE_ENV === "development" ? "no-store" : undefined,
    },
  );
};

export const fetchPublishingArtistPage = async ({ slug }: { slug: string }) => {
  return client.fetch<PublishingArtistPageQuery>(
    PublishingArtistPageQuery,
    { slug },
    {
      next: { tags: [slug] },
      cache: process.env.NODE_ENV === "development" ? "no-store" : undefined,
    },
  );
};
