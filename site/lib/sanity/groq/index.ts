import { defineQuery } from "next-sanity";
import type { File as SanityFile, Image, Slug } from "sanity";

import type { SanityImageAsset } from "../../../sanity.types";

export const AboutQuery = defineQuery(`
  *[_type == "about"][0]
`);

type TwoColumn<T> = {
  left: T;
  right: T;
};

type Item = {
  _id: string;
  name: string;
  _type: "item";
  link?: string;
};

export type Credits = {
  _key: string;
  title: string;
  _type: "credits";
  items: Item[];
  namedItems?: NamedItem[];
};

export type NamedItem = {
  _key: string;
  _type: "namedItem";
  name: string;
  items: Item[];
};

export type AboutQuery = {
  overview: string;
  title: string;
  part1: any[];
  part2: TwoColumn<Credits[]>;
  part3: any[];
  part4: TwoColumn<Credits[]>;
  part5: any[];
};

export type Link = {
  _key: string;
  _type: "link";
  name: string;
  href: string;
};

export const ContactQuery = defineQuery(`
  *[_type == "contact"][0]
`);

export type SEOQuery = {
  description: string;
  title: string;
  twitterSite: string;
  keywords: string;
  followLinks: Link[];
  cataloguePageTitle: string;
};

export const SEOQuery = defineQuery(`
  *[_type == "seo"][0]
`);

export type ContentSection = {
  _type: "contentSection";
  title: string;
  content: any[];
  link: Link;
};

export type ContactQuery = {
  overview: string;
  title: string;
  generalSection: ContentSection;
  locations: { name: string; type: string; phone?: string }[];
  /**
   * @deprecated
   */
  listenLinks: Link[];
  /**
   * @deprecated
   */
  followLinks: Link[];
  /**
   * @deprecated
   */
  pressKit: Link;
  /**
   * @deprecated
   */
  demoSection: ContentSection;
  /**
   * @deprecated
   */
  syncSection: ContentSection;
};

export type ArtistsQuery = Pick<
  Artist,
  "coverImage" | "name" | "slug" | "_id"
>[];

export const ArtistsQuery = defineQuery(`
*[_type == "artist" && defined(slug)] | order(name asc) {
  _id,
  slug,
  name,
  coverImage {
    ...,
    asset->{
      ...,
      metadata
    }
  }
}`);

export const ArtistsStaticParamsQuery = defineQuery(`
  *[_type == "artist" && defined(slug)] | order(name asc) {
    slug
  }
`);

export type ArtistsStaticParamsQuery = { slug: Slug }[];

export type Artist = {
  name: string;
  coverImage: Image & {
    asset: SanityImageAsset;
  };
  _id: string;
  _updatedAt: string;
  body: any[];
  slug: Slug;
  overview: string;
  links: Link[];
  _createdAt: string;
  _type: "artist";
  releases: Pick<
    Release,
    "title" | "releaseDate" | "releaseReference" | "slug"
  >[];
};

export const ArtistPageQuery =
  defineQuery(`*[_type == "artist" && slug.current == $slug][0] {
  ...,
  coverImage {
    ...,
    asset->{
      ...,
      metadata
    }
  },
  releases[]->{
    title,
    releaseReference,
    releaseDate,
    slug,
  }
}`);

export type ArtistPageQuery = Artist | null;

export const FAQsQuery = defineQuery(`
*[_type == "faqs" && defined(questions)] | order(_createdAt asc)`);

export type QuestionAnswer = {
  _id: string;
  question: string;
  answer: any[];
};

export type FAQ = {
  _id: string;
  category: string;
  slug: Slug;
  questions: QuestionAnswer[];
};

export type FAQsQuery = FAQ[];

export type Release = {
  _id: string;
  _updatedAt: string;
  _createdAt: string;
  _type: "release";
  title: string;
  slug: Slug;
  artist: Pick<Artist, "name" | "slug">[];
  overview: string;
  coverImage: Image & {
    asset: SanityImageAsset;
  };
  description: any[];
  productImages: (Image & {
    asset: SanityImageAsset;
  })[];
  releaseReference: `OXE #${string}`;
  releaseDate: string;
  shopifyProductDigital: string;
  digitalProductFormat: string;
  shopifyProductPhysical: string;
  physicalProductFormat: string;
  links: Link[];
  trackList: TrackList;
};

export const ReleasesQuery = defineQuery(`
*[_type == "release" && defined(slug)] | order(releaseDate desc) {
  ...,
  artist[]->{name},
  coverImage {
    ...,
    asset->{
      ...,
      metadata
    }
  },
  trackList {
    ...,
    tracks[] {
      ...,
      artists[]->{name, slug, _type}
    }
  }
}`);

export type ReleasesQuery = Release[];

export const ReleasesStaticParamsQuery = defineQuery(`
*[_type == "release" && defined(slug)] | order(releaseDate asc) {
  slug
}`);

export type ReleasesStaticParamsQuery = { slug: Slug }[];

export const ReleasePageQuery = defineQuery(`
*[_type == "release" && slug.current == $slug][0] {
  ...,
  artist[]->{name, slug},
  productImages[] {
    ...,
    asset->{
      ...,
      metadata
    }
  },
  trackList {
    ...,
    tracks[] {
      ...,
      artists[]->{name, slug, _type}
    }
  }
}`);

export type ReleasePageQuery = Release | null;

export const ReleaseTracklistQuery = defineQuery(`
*[_type == "release" && slug.current == $slug][0] {
  productImages[0...1],
  title,
  trackList {
    ...,
    tracks[] {
      ...,
      artists[]->{name, slug, _type}
    }
  }
}`);

export type ReleaseTracklistQuery = Pick<
  Release,
  "trackList" | "title" | "productImages"
> | null;

export const LegalStaticParamsQuery =
  defineQuery(`*[_type == "legal" && defined(slug)] {
  slug
}`);

export type LegalStaticParamsQuery = { slug: Slug }[];

export const LegalQuery = defineQuery(`
*[_type == "legal" && defined(slug)]`);

export type Legal = {
  _id: string;
  _updatedAt: string;
  _createdAt: string;
  _type: "legal";
  title: string;
  slug: Slug;
  overview: string;
  englishTitle: string;
  englishContent: any[];
  frenchTitle: string;
  frenchContent: any[];
};

export type LegalQuery = Legal[];

export const LegalPageQuery = defineQuery(`
  *[_type == "legal" && slug.current == $slug][0]
`);

export type LegalPageQuery = Legal | null;

export const PublishingQuery = defineQuery(`
  *[_type == "publishing"][0]
`);

export type PublishingQuery = {
  title: string;
  overview: string;
  creativeServicesSection: ContentSection;
  scoreSection: ContentSection;
  syncSection: ContentSection;
  artistsHeroImage: Image;
  licenseRequestEmail: string;
};

export const PublishingArtistsQuery = defineQuery(`
*[_type == "publishingArtist" && defined(slug)] | order(name asc) {
  _id,
  slug,
  name,
  coverImage {
    ...,
    asset->{
      ...,
      metadata
    }
  },
}`);

export const PublishingArtistsStaticParamsQuery = defineQuery(`
  *[_type == "publishingArtist" && defined(slug)] | order(name asc) {
    slug
  }
`);

export type PublishingArtistsStaticParamsQuery = { slug: Slug }[];

export type PublishingArtist = {
  name: string;
  coverImage: Image & {
    asset: SanityImageAsset;
  };
  _id: string;
  _updatedAt: string;
  body: any[];
  slug: Slug;
  overview: string;
  links: Link[];
  projects: {
    _key: string;
    _type: "link";
    name: string;
    href?: string;
  }[];
  _createdAt: string;
  _type: "publishingArtist";
  works: TrackList;
};

export type Track = {
  _key: string;
  _type: "track";
  length: string;
  name: string;
  number: number;
  artists: (Pick<Artist, "name" | "slug"> & {
    _type: "publishingArtist" | "artist";
  })[];
  file?: SanityFile;
};

export type TrackList = {
  type: "trackList";
  tracks: Track[];
};

export type PublishingArtistsQuery = Pick<
  PublishingArtist,
  "coverImage" | "name" | "slug" | "_id"
>[];

export const PublishingArtistPageQuery = defineQuery(`
  *[_type == "publishingArtist" && slug.current == $slug][0] {
    ...,
    coverImage {
      ...,
      asset->{
        ...,
        metadata
      }
    },
    works {
      ...,
      tracks[] {
        ...,
        artists[]->{name, slug, _type}
      }
    }
  }
`);

export type PublishingArtistPageQuery = PublishingArtist | null;
