import Link from "next/link";

import { Artist } from "../groq";
import { urlForImage } from "../lib/sanity";

export default function ArtistRow({ artist }: { artist: Artist }) {
  const link = "/artists/" + artist.slug.current;

  const url = urlForImage(artist.coverImage).url();
  const webpUrl = urlForImage(artist.coverImage).format("webp").url();

  return (
    <li className="group px-9 last:!border-b last:border-black lg:px-10">
      <Link
        className="text-oxe-xxl-mobile/[60px] lg:text-oxe-xxl/[96px]"
        href={link}
      >
        {artist.name}
      </Link>

      <picture className="absolute right-10 top-1/2 hidden -translate-y-1/2 md:group-hover:block">
        <source srcSet={webpUrl} type="image/webp" />
        <img
          className="aspect-[16/10] w-full max-w-lg object-cover object-center"
          alt={artist.name}
          src={url}
          loading="lazy"
          decoding="async"
        />
      </picture>
    </li>
  );
}
