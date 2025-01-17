/**
 * @note Used for fetch next.tag cache invalidation
 */
export const FETCH_CACHE_TAGS = {
  FAQ: "faq",

  PUBLISHING: "publishing",
  PUBLISHING_ARTISTS: "publishingArtists",
  PUBLISHING_ARTISTS_STATIC_PARAMS: "publishingArtistsStaticParams",

  RELEASES: "releases",
  RELEASES_STATIC_PARAMS: "releasesStaticParams",

  LEGAL_STATIC_PARAMS: "legalStaticParams",

  ABOUT: "about",
  CONTACT: "contact",

  ARTISTS: "artists",
  ARTISTS_STATIC_PARAMS: "artistsStaticParams",

  SEO: "seo",
} as const;
