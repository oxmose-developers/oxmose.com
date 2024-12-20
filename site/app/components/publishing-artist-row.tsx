import Link from "next/link";

import type { PublishingArtist } from "../../lib/sanity";

export default function PublishingArtistRow({
  publishingArtist,
}: {
  publishingArtist: Pick<PublishingArtist, "name" | "slug">;
}) {
  return (
    <li>
      <Link
        href={`/publishing/${publishingArtist.slug.current}`}
        className="h- block px-9 pt-px text-oxe-md/10 hover:bg-white hover:text-black md:py-0 md:text-oxe-xxxxl/24"
      >
        {publishingArtist.name}
      </Link>
    </li>
  );
}
