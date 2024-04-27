import type { CSSProperties } from "react";

import { ArtistsStaticParamsQuery } from "../../../../../groq";
import { client } from "../../../../../lib/sanity";

export default async function Pagination({
  slug,
  style,
}: {
  slug: string;
  style?: CSSProperties;
}) {
  const artists = await client.fetch<ArtistsStaticParamsQuery>(
    ArtistsStaticParamsQuery,
    {},
    { next: { tags: ["artistsStaticParams"] } },
  );

  const index = artists.findIndex((el) => el.slug.current === slug);

  const prev = index === 0 ? artists[artists.length - 1] : artists[index - 1];

  const next = artists.length === index + 1 ? artists[0] : artists[index + 1];

  return (
    <div
      className="flex h-10 items-center justify-between border-y border-black px-9 lg:border-t-0 lg:px-10"
      style={style}
    >
      <a
        href={`/artists/${prev.slug}`}
        className="text-oxe-sm font-medium uppercase"
      >
        Prev
      </a>

      <a
        href={`/artists/${next.slug}`}
        className="text-oxe-sm font-medium uppercase"
      >
        Next
      </a>
    </div>
  );
}
