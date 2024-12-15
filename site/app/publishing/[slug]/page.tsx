import type { Metadata, ResolvingMetadata, Viewport } from "next";
import { PortableText } from "next-sanity";
import { hasAtLeast } from "remeda";

import { fetchPublishingArtistPage, urlForImage } from "../../../lib/sanity";
import Pagination from "../../components/publishing-artist-pagination";
import Tracklist from "../../components/tracklist";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
) {
  const params = await props.params;
  const existingMetadata = (await parent) as unknown as Metadata;

  const { slug } = params;

  const artist = await fetchPublishingArtistPage({ slug: slug });

  return {
    title: artist.name,
    description: artist.overview,
    openGraph: {
      ...existingMetadata.openGraph,
      title: artist.name,
      description: artist.overview,
    },
    twitter: {
      ...existingMetadata.openGraph,
      title: artist.name,
      description: artist.overview,
    },
  } satisfies Metadata;
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;

  const artist = await fetchPublishingArtistPage({ slug: slug });
  artist.works.tracks.map((track) => ({
    ...track,
    artists: [artist.name],
  }));

  const url = urlForImage(artist.coverImage).url();
  const webpUrl = urlForImage(artist.coverImage).format("webp").url();

  return (
    <div className="artist-single-page-layout grid border-b border-black dark:border-white md:grid-cols-2">
      <div
        className="px-9 md:border-b md:border-black md:px-10 md:dark:border-white"
        style={{ gridArea: "name" }}
      >
        <h1 className="md:text-oxe-xxl/24 text-oxe-lg/15">{artist.name}</h1>
      </div>

      {/* Mobile-only Full Bleed Image */}
      <div className="block md:hidden" style={{ gridArea: "image" }}>
        <picture className="block">
          <source srcSet={webpUrl} type="image/webp" />

          <img
            className="aspect-[16/10] w-full object-cover object-center"
            alt={artist.name}
            src={url}
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>

      <Pagination slug={slug} style={{ gridArea: "pagination" }} />

      <div className="px-9 py-7 md:p-10" style={{ gridArea: "bio" }}>
        <picture className="mb-10 hidden md:block">
          <source srcSet={webpUrl} type="image/webp" />
          <img
            className="aspect-[16/10] w-full max-w-4xl object-cover object-center"
            alt={artist.name}
            src={url}
            loading="lazy"
            decoding="async"
          />
        </picture>

        <div className="prose max-w-[unset] text-black prose-p:text-oxe-xs/5 prose-a:text-black prose-a:underline prose-strong:font-medium dark:text-white dark:prose-a:text-white md:prose-p:text-oxe-md">
          <PortableText value={artist.body} />
        </div>

        {/* Mobile Only Table */}
        {!!artist?.works && hasAtLeast(artist.works.tracks, 1) && (
          <div className="-mx-9 block pt-7 md:hidden">
            <div className="mb-3 pl-9">
              <h3 className="text-oxe-sm font-medium uppercase md:text-[2.1875rem]/8">
                Works
              </h3>
            </div>

            <Tracklist tracks={artist.works} artistName={artist.name} />
          </div>
        )}
      </div>

      <div
        className="flex min-h-[28rem] flex-col px-9 py-7 md:grid md:auto-rows-[minmax(max-content,calc(100svh/3))] md:gap-20 md:border-l md:border-black md:p-10 md:dark:border-white"
        style={{ gridArea: "info" }}
      >
        {/* Desktop Only Table */}
        {!!artist?.works && hasAtLeast(artist.works.tracks, 1) && (
          <div className="-mx-10 hidden md:block">
            <div className="mb-6 pl-9">
              <h3 className="text-oxe-sm font-medium uppercase md:text-[2.1875rem]/8">
                Works
              </h3>
            </div>

            <Tracklist tracks={artist.works} artistName={artist.name} />
          </div>
        )}

        {!!artist?.projects && hasAtLeast(artist.projects, 1) && (
          <div className="flex flex-1 items-start md:flex-col">
            <div className="flex items-center gap-1.5 md:gap-4">
              <div className="-mt-[0.1875rem] size-4 rounded-full border border-black bg-white dark:border-white md:size-5"></div>

              <h3 className="text-oxe-sm font-medium uppercase md:text-[2.1875rem]/8">
                Projects
              </h3>
            </div>

            <ul className="ml-auto text-right text-oxe-xs md:ml-0 md:pl-9 md:text-left md:text-oxe-sm/8">
              {artist.projects.map((link) => (
                <li key={link._key}>
                  {link.href ? (
                    <a href={link.href}>{link.name}</a>
                  ) : (
                    <span>{link.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-start md:flex-col">
          <div className="flex items-center gap-1.5 md:gap-4">
            <div className="-mt-[0.1875rem] size-4 rounded-full border border-black bg-black dark:border-white md:size-5"></div>

            <h3 className="text-oxe-sm font-medium uppercase md:text-[2.1875rem]/8">
              More
            </h3>
          </div>

          <ul className="ml-auto text-right text-oxe-xs md:ml-0 md:pl-9 md:text-left md:text-oxe-sm/8">
            {!!artist?.links &&
              hasAtLeast(artist.links, 1) &&
              artist.links.map((link) => (
                <li key={link._key}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
