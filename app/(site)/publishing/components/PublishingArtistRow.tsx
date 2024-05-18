import Link from "next/link";

import type { PublishingArtist } from "../../../../groq";

export default function PublishingArtistRow({
  publishingArtist,
}: {
  publishingArtist: Pick<PublishingArtist, "name" | "slug">;
}) {
  return (
    <li>
      <Link
        href={`/publishing/${publishingArtist.slug.current}`}
        className="block px-9 pt-px text-[30px]/[40px] hover:bg-white hover:text-black lg:py-0 lg:text-[80px]/[96px]"
      >
        {publishingArtist.name}
      </Link>
    </li>
  );
}
