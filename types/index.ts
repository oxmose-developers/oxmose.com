import type { Image, PortableTextBlock } from "sanity";

export interface MenuItem {
  _type: string;
  slug?: string;
  title?: string;
}

export interface ImageWithPlaceholder extends Image {
  lqip: string;
}

// Page payloads

export interface HomePagePayload {
  footer?: PortableTextBlock[];
  overview?: PortableTextBlock[];
  title?: string;
}

export interface PagePayload {
  body?: PortableTextBlock[];
  name?: string;
  overview?: PortableTextBlock[];
  title?: string;
  slug?: string;
}

export interface LinkPayload {
  href: string;
  name: string;
}

export interface ArtistPayload {
  about?: PortableTextBlock[];
  coverImage?: ImageWithPlaceholder;
  links?: LinkPayload[];
  name?: string;
  overview?: PortableTextBlock[];
  slug: string;
  _type: string;
}

export interface ArtistListPayload {
  _id: string;
  name?: string;
  slug: string;
  _type: string;
}

export interface SettingsPayload {
  footer?: PortableTextBlock[];
  menuItems?: MenuItem[];
  ogImage?: Image;
}

export interface ReleasePayload {
  _id: string;
  slug: string;
  title: string;
  artist: string;
  coverImage: ImageWithPlaceholder;
  productImages?: ImageWithPlaceholder[];
  description: PortableTextBlock[];
  overview?: PortableTextBlock[];
  trackList: string[];
  releaseDate?: Date;
  releaseReference?: string;
  physicalFormat?: boolean;
  physicalPrice?: number;
  digitalFormat?: boolean;
  digitalPrice?: number;
  links?: LinkPayload[];
}

export interface ReleaseListPayload {
  _id: string;
  slug: string;
  title: string;
  artist: { name: string };
  coverImage: ImageWithPlaceholder;
  _type: string
}