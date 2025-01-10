import { notFound } from "next/navigation";

import { NEXT_TAGS } from "../../constants/tags";
import { sanityFetch } from "./client";
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
  SEOQuery,
} from "./groq";

export const fetchReleases = async () => {
  return sanityFetch<ReleasesQuery>({
    query: ReleasesQuery,
    tags: [NEXT_TAGS.RELEASES],
  });
};

export const fetchReleasePage = async ({ slug }: { slug: string }) => {
  const data = await sanityFetch<ReleasePageQuery>({
    query: ReleasePageQuery,
    params: { slug },
    tags: [slug],
  });

  if (!data) {
    return notFound();
  }

  return data;
};

export const fetchReleasesStaticParams = async () => {
  return sanityFetch<ReleasesStaticParamsQuery>({
    query: ReleasesStaticParamsQuery,
    tags: [NEXT_TAGS.RELEASES_STATIC_PARAMS],
  });
};

export const fetchPublishingPage = async () => {
  return sanityFetch<PublishingQuery>({
    query: PublishingQuery,
    tags: [NEXT_TAGS.PUBLISHING],
  });
};

export const fetchPublishingArtists = async () => {
  return sanityFetch<PublishingArtistsQuery>({
    query: PublishingArtistsQuery,
    tags: [NEXT_TAGS.PUBLISHING_ARTISTS],
  });
};

export const fetchPublishingArtistsStaticParams = async () => {
  return sanityFetch<PublishingArtistsStaticParamsQuery>({
    query: PublishingArtistsStaticParamsQuery,
    tags: [NEXT_TAGS.PUBLISHING_ARTISTS_STATIC_PARAMS],
  });
};

export const fetchPublishingArtistPage = async ({ slug }: { slug: string }) => {
  const data = await sanityFetch<PublishingArtistPageQuery>({
    query: PublishingArtistPageQuery,
    params: { slug },
    tags: [slug],
  });

  if (!data) {
    return notFound();
  }

  return data;
};

export const fetchLegalStaticParams = async () => {
  return sanityFetch<LegalStaticParamsQuery>({
    query: LegalStaticParamsQuery,
    tags: [NEXT_TAGS.LEGAL_STATIC_PARAMS],
  });
};

export const fetchLegalPage = async ({ slug }: { slug: string }) => {
  const data = await sanityFetch<LegalPageQuery>({
    query: LegalPageQuery,
    params: { slug },
    tags: [slug],
  });

  if (!data) {
    return notFound();
  }

  return data;
};

export const fetchFaqs = async () => {
  return sanityFetch<FAQsQuery>({
    query: FAQsQuery,
    tags: [NEXT_TAGS.FAQ],
  });
};

export const fetchFaq = async ({ slug }: { slug: string }) => {
  const faqs = await fetchFaqs();
  const faq = faqs.find((el) => el.slug.current === slug);

  if (!faq) {
    return notFound();
  }

  return faq;
};

export const fetchContactPage = async () => {
  return sanityFetch<ContactQuery>({
    query: ContactQuery,
    tags: [NEXT_TAGS.CONTACT],
  });
};

export const fetchArtists = async () => {
  return sanityFetch<ArtistsQuery>({
    query: ArtistsQuery,
    tags: [NEXT_TAGS.ARTISTS],
  });
};

export const fetchArtistsStaticParams = async () => {
  return sanityFetch<ArtistsStaticParamsQuery>({
    query: ArtistsStaticParamsQuery,
    tags: [NEXT_TAGS.ARTISTS_STATIC_PARAMS],
  });
};

export const fetchArtistPage = async ({ slug }: { slug: string }) => {
  const data = await sanityFetch<ArtistPageQuery>({
    query: ArtistPageQuery,
    params: { slug },
    tags: [slug],
  });

  if (!data) {
    return notFound();
  }

  return data;
};

export const fetchAboutPage = async () => {
  return sanityFetch<AboutQuery>({
    query: AboutQuery,
    tags: [NEXT_TAGS.ABOUT],
  });
};

export const fetchSEO = async () => {
  return sanityFetch<SEOQuery>({
    query: SEOQuery,
    tags: [NEXT_TAGS.SEO],
  });
};
