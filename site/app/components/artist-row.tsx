import Image from "next/image";
import Link from "next/link";

import type { Artist } from "../../lib/sanity";
import { urlForImage } from "../../lib/sanity";

export default function ArtistRow({
  artist,
}: {
  artist: Pick<Artist, "coverImage" | "name" | "slug" | "_id">;
}) {
  const link = "/artists/" + artist.slug.current;

  return (
    <li className="group px-9 last:!border-b last:border-black md:px-10">
      <div className="absolute right-10 top-1/2 hidden -translate-y-1/2 md:group-hover:block">
        <Image
          className="w-full max-w-[36rem] select-none object-cover object-center"
          alt={artist.name}
          src={urlForImage(artist.coverImage)
            .width(576)
            .height(380)
            .dpr(3)
            .url()}
          width={576}
          height={380}
          draggable={false}
          loading="lazy"
        />
      </div>

      <Link
        className="relative z-10 text-oxe-xl/15 md:text-oxe-xxxxl/24"
        href={link}
      >
        {artist.name}
      </Link>
    </li>
  );
}
