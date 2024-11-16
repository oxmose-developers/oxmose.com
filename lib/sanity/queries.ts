import { notFound } from "next/navigation";

import { NEXT_TAGS } from "../../constants/tags";
import {
  AboutQuery,
  ArtistPageQuery,
  ArtistsQuery,
  ArtistsStaticParamsQuery,
  ContactQuery,
  FAQsQuery,
  LegalPageQuery,
  LegalStaticParamsQuery,
  PublishingArtistPageQuery,
  PublishingArtistsQuery,
  PublishingArtistsStaticParamsQuery,
  PublishingQuery,
  ReleasePageQuery,
  ReleasesQuery,
  ReleasesStaticParamsQuery,
} from "../../groq";
import { client } from ".";

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

export const fetchLegalStaticParams = async () =>
  client.fetch<LegalStaticParamsQuery>(
    LegalStaticParamsQuery,
    {},
    {
      next: { tags: [NEXT_TAGS.LEGAL_STATIC_PARAMS] },
      cache:
        process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    },
  );

export const fetchLegalPage = async ({ slug }: { slug: string }) => {
  const data = await client.fetch<LegalPageQuery>(
    LegalPageQuery,
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

export const fetchFaqs = async () =>
  client.fetch<FAQsQuery>(
    FAQsQuery,
    {},
    {
      next: { tags: [NEXT_TAGS.FAQ] },
      cache:
        process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    },
  );

export const fetchFaq = async ({ slug }: { slug: string }) => {
  const faqs = await fetchFaqs();

  const faq = faqs.find((el) => el.slug.current === slug);

  if (!faq) {
    return notFound();
  }

  return faq;
};

export const fetchContactPage = async () =>
  client.fetch<ContactQuery>(
    ContactQuery,
    {},
    {
      next: { tags: [NEXT_TAGS.CONTACT] },
      cache:
        process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    },
  );

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
