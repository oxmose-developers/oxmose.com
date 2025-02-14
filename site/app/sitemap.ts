import type { MetadataRoute } from "next";

import {
  fetchArtistsStaticParams,
  fetchFaqs,
  fetchPublishingArtistsStaticParams,
  fetchReleasesStaticParams,
} from "../lib/sanity";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const links: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const staticPages = ["about", "contact", "artists", "publishing"];

  for (const page of staticPages) {
    links.push({
      url: `${baseUrl}/${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  const artists = await fetchArtistsStaticParams();

  for (const artist of artists) {
    links.push({
      url: `${baseUrl}/artists/${artist.slug.current}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    });
  }

  const publishingArtists = await fetchPublishingArtistsStaticParams();

  for (const publishingArtist of publishingArtists) {
    links.push({
      url: `${baseUrl}/publishing/${publishingArtist.slug.current}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    });
  }

  const releases = await fetchReleasesStaticParams();

  for (const release of releases) {
    links.push({
      url: `${baseUrl}/catalogue/${release.slug.current}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    });
  }

  const faqs = await fetchFaqs();

  for (const faq of faqs) {
    links.push({
      url: `${baseUrl}/faq/${faq.slug.current}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return links;
}
