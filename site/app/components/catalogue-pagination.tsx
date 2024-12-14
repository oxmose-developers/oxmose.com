import Link from "next/link";
import type { CSSProperties } from "react";

import { fetchReleasesStaticParams } from "../../lib/sanity";

export default async function Pagination({
  slug,
  style,
}: {
  slug: string;
  style?: CSSProperties;
}) {
  const release = await fetchReleasesStaticParams();

  const index = release.findIndex((el) => el.slug.current === slug);

  const prev = index === 0 ? release[release.length - 1] : release[index - 1];

  const next = release.length === index + 1 ? release[0] : release[index + 1];

  return (
    <div
      className="flex h-10 items-center justify-between border-b border-black px-9 md:border-y md:px-10"
      style={style}
    >
      <Link
        href={`/catalogue/${prev.slug.current}`}
        className="text-oxe-sm font-medium uppercase"
      >
        Prev
      </Link>

      <Link
        href={`/catalogue/${next.slug.current}`}
        className="text-oxe-sm font-medium uppercase"
      >
        Next
      </Link>
    </div>
  );
}
