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
}

export interface SettingsPayload {
  footer?: PortableTextBlock[];
  menuItems?: MenuItem[];
  ogImage?: Image;
}
