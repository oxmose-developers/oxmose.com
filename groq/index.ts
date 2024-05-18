import type { Image, Slug } from "sanity";

export const AboutQuery = /* groq */ `
  *[_type == "about"][0]
`;

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

export const ContactQuery = /* groq */ `
  *[_type == "contact"][0]
`;

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
  listenLinks: Link[];
  followLinks: Link[];
  pressKit: Link;
  demoSection: ContentSection;
  syncSection: ContentSection;
};

export const ArtistsQuery = /* groq */ `
*[_type == "artist" && defined(slug)] | order(name asc) {
  _id,
  slug,
  name,
  coverImage
}`;

export const ArtistsStaticParamsQuery = /* groq */ `*[_type == "artist" && defined(slug)] | order(name asc) {
  slug
}`;

export type ArtistsStaticParamsQuery = { slug: Slug }[];

export type Artist = {
  name: string;
  coverImage: Image;
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

export type ArtistsQuery = Pick<
  Artist,
  "coverImage" | "name" | "slug" | "_id"
>[];

export const ArtistPageQuery = /* groq */ `*[_type == "artist" && slug.current == $slug][0] {
  ...,
  releases[]->{
    title,
    releaseReference,
    releaseDate,
    slug,
  }
}`;

export type ArtistPageQuery = Artist | null;

export const FAQsQuery = /* groq */ `
*[_type == "faqs" && defined(questions)] | order(_createdAt asc)`;

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
  artist: Pick<Artist, "name">[];
  overview: string;
  coverImage: Image;
  description: any[];
  productImages: Image[];
  releaseReference: `OXE #${string}`;
  releaseDate: string;
  shopifyProductDigital: string;
  shopifyProductPhysical: string;
  links: Link[];
};

export const ReleasesQuery = /* groq */ `
*[_type == "release" && defined(slug)] | order(releaseDate desc) {
  ...,
  artist[]->{name}
}`;

export type ReleasesQuery = Release[];

export const LegalStaticParamsQuery = /* groq */ `*[_type == "legal" && defined(slug)] {
  slug
}`;

export type LegalStaticParamsQuery = { slug: Slug }[];

export const LegalQuery = /* groq */ `
*[_type == "legal" && defined(slug)]`;

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

export const LegalPageQuery = /* groq */ `*[_type == "legal" && slug.current == $slug][0]`;

export type LegalPageQuery = Legal | null;

export const PublishingQuery = /* groq */ `
  *[_type == "publishing"][0]
`;

export type PublishingQuery = {
  title: string;
  overview: string;
  creativeServicesSection: ContentSection;
  scoreSection: ContentSection;
  syncSection: ContentSection;
  artistsHeroImage: Image;
};
