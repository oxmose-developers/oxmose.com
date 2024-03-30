import type { Image, Slug } from "sanity";

export const AboutQuery = /* groq */ `
  *[_type == "about"][0]
`;

type TwoColumn<T> = {
  left: T;
  right: T;
};

type Item = {
  name: string;
  _type: "item";
  link?: string;
};

export type Credits = {
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
*[_type == "artist" && defined(slug)] | order(name asc)`;

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
};

export type ArtistsQuery = Artist[];

export const FAQsQuery = /* groq */ `
*[_type == "faqs" && defined(questions)] | order(_createdAt asc)`;

export type QuestionAnswer = {
  question: string;
  answer: any[];
};

export type FAQ = {
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
  links: Link[];
};

export const ReleasesQuery = /* groq */ `
*[_type == "release" && defined(slug)] | order(_createdAt asc) {
  ...,
  artist[]->{name}
}`;

export type ReleasesQuery = Release[];
