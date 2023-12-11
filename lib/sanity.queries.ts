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

export const aboutPageQuery = groq`
  *[_type == "about"][0]{
    _id,
    overview,
    title,
  }
`;

export const contactLinksQuery = groq`
  *[_type == "about"][0]{
    _id,
    listenLinks,
    socialLinks,
    "pressKit": press.asset->url,
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
export const artistListQuery = groq`
  *[_type == "artist"]{
    _id, 
    name, 
    _type, 
    "slug": slug.current,
    coverImage {
      ...,
      "lqip": asset->metadata.lqip
    },
  }
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

export const releaseListQuery = groq`
*[_type == "release"]{
  _id,
  _type,
  "slug": slug.current,
  title,
  artist-> {
    _type,
    name,
    "slug": slug.current
  },
  coverImage {
    ...,
    "lqip": asset->metadata.lqip
  },
}
`;

export const releasePaths = groq`
  *[_type == "release" && slug.current != null].slug.current
`;

export const releaseBySlugQuery = groq`
*[_type == "release" && slug.current == $slug][0] {
  ...,
  "slug": slug.current,
  coverImage {
    ...,
    "lqip": asset->metadata.lqip
  },
  artist-> {
    _type,
    name,
    "slug": slug.current
  },
  trackList[] {
    title,
    "time": {
      "minutes": duration.minutes,
      "seconds": duration.seconds
    }
  }
}
`;

export const releaseByArtistQuery = groq`
*[_type == "release" && artist._ref == $id] {
  _id,
  _type,
  title,
  "slug": slug.current,
  releaseDate,
  releaseReference
}
`;

export const faqsQuery = groq`
*[_type == "faq"]{
  ...
}
`
export const privacyArticlesQuery = groq`
*[_type == "privacy"]{
  ...
}
`
export const termsQuery = groq`
*[_type == "terms"]{
  ...
}
`

export const teamQuery = groq`
*[_type == "team"][0]{
  ...
}
`

