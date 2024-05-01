import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

import type { Release } from "../../../../groq";
import { urlForImage } from "../../../../lib/sanity";

export default function CatalogueCard({
  release,
  className,
}: {
  release: Release;
  className?: string;
}) {
  const link = "/catalogue/" + release.slug.current;

  const url = urlForImage(release.coverImage).url();
  const webpUrl = urlForImage(release.coverImage).format("webp").url();

  return (
    <article
      className={cn(
        "flex flex-col self-stretch justify-self-stretch",
        className,
      )}
    >
      <div className="flex flex-1 flex-col lg:p-9">
        <header className="mb-24 hidden shrink-0 lg:block">
          <h2 className="text-oxe-xxl font-medium">{release.title}</h2>
        </header>

        <div className="flex flex-1 flex-col lg:flex-row-reverse lg:items-end lg:gap-9">
          <div className="relative aspect-square size-full lg:max-w-2xl">
            <Image
              src={webpUrl}
              className="inline-block aspect-square size-full shrink grow-0"
              // width={672}
              // height={672}
              fill
              objectFit="cover"
              objectPosition="center"
              loading="lazy"
              unoptimized
              alt={`${release.title} Album Cover`}
            />
          </div>

          <div className="px-9 py-6 lg:mr-auto lg:p-0">
            <h2 className="block text-oxe-sm font-medium lg:hidden">
              {release.title}
            </h2>

            <p className="text-oxe-sm lg:-mb-2.5 lg:text-oxe-lg lg:font-medium">
              {release.artist.map((el) => el.name).join(", ")}
            </p>
          </div>
        </div>
      </div>

      <footer className="shrink-0 border-t border-black px-9 py-2">
        <div className="flex justify-between">
          <Link
            className="text-oxe-xs font-medium uppercase lg:text-oxe-sm"
            href={link}
          >
            More
          </Link>

          {/* @todo hook up into player */}
          <button
            type="button"
            className="text-oxe-xs font-medium uppercase lg:text-oxe-sm"
          >
            Listen
          </button>
        </div>
      </footer>
    </article>
  );
}
