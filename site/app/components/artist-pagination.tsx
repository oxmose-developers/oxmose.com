import Link from "next/link";
import type { CSSProperties } from "react";

import { fetchArtistsStaticParams } from "../../lib/sanity";

export default async function Pagination({
  slug,
  style,
}: {
  slug: string;
  style?: CSSProperties;
}) {
  const artists = await fetchArtistsStaticParams();

  const index = artists.findIndex((el) => el.slug.current === slug);

  const prev = index === 0 ? artists[artists.length - 1] : artists[index - 1];

  const next = artists.length === index + 1 ? artists[0] : artists[index + 1];

  return (
    <div
      className="flex h-10 items-center justify-between border-y border-black px-9 md:border-t-0 md:px-10"
      style={style}
    >
      <Link
        href={`/artists/${prev.slug.current}`}
        className="text-oxe-sm font-medium uppercase"
      >
        Prev
      </Link>

      <Link
        href={`/artists/${next.slug.current}`}
        className="text-oxe-sm font-medium uppercase"
      >
        Next
      </Link>
    </div>
  );
}
