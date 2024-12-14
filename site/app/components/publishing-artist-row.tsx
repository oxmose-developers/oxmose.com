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
        className="block px-9 pt-px text-[1.875rem]/[2.5rem] hover:bg-white hover:text-black md:py-0 md:text-[5rem]/[6rem]"
      >
        {publishingArtist.name}
      </Link>
    </li>
  );
}
