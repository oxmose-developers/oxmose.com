import Link from "next/link";

import type { Artist } from "../../lib/sanity";
import { urlForImage } from "../../lib/sanity";

export default function ArtistRow({
  artist,
}: {
  artist: Pick<Artist, "coverImage" | "name" | "slug" | "_id">;
}) {
  const link = "/artists/" + artist.slug.current;

  const url = urlForImage(artist.coverImage).url();
  const webpUrl = urlForImage(artist.coverImage).format("webp").url();

  return (
    <li className="group px-9 last:!border-b last:border-black md:px-10">
      <picture className="absolute right-10 top-1/2 hidden -translate-y-1/2 xl:group-hover:block">
        <source srcSet={webpUrl} type="image/webp" />
        <img
          className="aspect-[16/10] w-full max-w-[36rem] select-none object-cover object-center"
          alt={artist.name}
          src={url}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </picture>

      <Link
        className="md:text-oxe-xxxxl/24 text-oxe-xl/15 relative z-10"
        href={link}
      >
        {artist.name}
      </Link>
    </li>
  );
}
