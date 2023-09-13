import { groq } from "next-sanity";

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    title,
  }
`;

export const homePageTitleQuery = groq`
  *[_type == "home"][0].title
`;

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
  }
`;

export const artistBySlugQuery = groq`
  *[_type == "artist" && slug.current == $slug][0] {
    _id,
    coverImage {
      ...,
      "lqip": asset->metadata.lqip
    },
    about,
    overview,
    "slug": slug.current,
    name,
    links,
  }
`;

export const artistPaths = groq`
  *[_type == "artist" && slug.current != null].slug.current
`;

export const pagePaths = groq`
  *[_type == "page" && slug.current != null].slug.current
`;

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    ogImage,
  }
`;
