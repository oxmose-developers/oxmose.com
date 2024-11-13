"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import type { Release } from "../../groq";
import { urlForImage } from "../../lib/sanity";
import { tracksToPlaylist, usePlayerActions } from "../context/player-context";

export default function CatalogueCard({
  release,
  className,
}: {
  release: Release;
  className?: string;
}) {
  const playerActions = usePlayerActions();

  const link = "/catalogue/" + release.slug.current;

  const url = urlForImage(release.coverImage).url();
  const webpUrl = urlForImage(release.coverImage).format("webp").url();

  return (
    <article
      className={clsx(
        "flex flex-col self-stretch justify-self-stretch @container",
        className,
      )}
    >
      <div className="flex flex-1 flex-col-reverse @xl:grid @xl:grid-cols-[minmax(11rem,1fr)_minmax(0,655px)] @xl:gap-x-8 @xl:gap-y-24 @xl:p-9">
        <header className="col-span-full hidden shrink-0 @xl:block">
          <h2 className="text-oxe-xxl font-medium">{release.title}</h2>
        </header>

        <div className="px-9 py-5 @xl:ml-auto @xl:self-end @xl:p-0">
          <h2 className="block text-oxe-sm/7 font-medium @xl:hidden">
            {release.title}
          </h2>

          <p
            className="break-words text-oxe-sm/7 @xl:-mb-2.5 @xl:text-oxe-lg @xl:font-medium"
            style={{ wordBreak: "break-word" }}
          >
            {release.artist.map((el) => el.name).join(", ")}
          </p>
        </div>

        <div className="relative aspect-square w-full @xl:max-w-[655px]">
          <Image
            loading="lazy"
            src={webpUrl}
            className="size-full object-cover object-center"
            alt={`${release.title} Album Cover`}
            unoptimized
            fill
          />
        </div>
      </div>

      <footer className="shrink-0 border-t border-black px-9 py-2">
        <div className="flex justify-between">
          <Link
            className="text-oxe-xs font-medium uppercase @xl:text-oxe-sm"
            href={link}
          >
            More
          </Link>

          {release?.trackList?.tracks?.every((el) => el.file) && (
            <button
              type="button"
              className="text-oxe-xs font-medium uppercase @xl:text-oxe-sm"
              onClick={() => {
                console.log(release.trackList);

                playerActions.loadPlaylist(
                  tracksToPlaylist(
                    release.trackList.tracks,
                    urlForImage(release.productImages[0])
                      .width(512)
                      .height(512)
                      .format("jpg")
                      .url(),
                    release.title,
                  ),
                );

                playerActions.play(0);
              }}
            >
              Listen
            </button>
          )}
        </div>
      </footer>
    </article>
  );
}
