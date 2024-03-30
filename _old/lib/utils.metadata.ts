import { urlForImage } from "_old/lib/sanity.image";
import type { Metadata } from "next";
import type { Image } from "sanity";

/**
 * All the shared stuff that goes into <head> on `(site)` routes, can be be imported by `page.tsx` files and used by `generateMetadata` functions.
 */
export function defineMetadata({
  baseTitle,
  description,
  image,
  title,
}: {
  baseTitle?: string;
  description?: string;
  image?: Image;
  title?: string;
}): Metadata {
  const metaTitle = [
    ...(baseTitle ? [baseTitle] : []),
    ...(title ? [title] : []),
  ].join(" | ");

  const imageUrl =
    image && urlForImage(image)?.width(1200).height(627).fit("crop").url();

  return {
    title: metaTitle,
    themeColor: "#000",
    description,
    openGraph: imageUrl ? { images: [imageUrl] } : undefined,
  } satisfies Metadata;
}
