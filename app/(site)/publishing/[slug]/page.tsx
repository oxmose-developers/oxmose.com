import type { Metadata, ResolvingMetadata, Viewport } from "next";
import { PortableText } from "next-sanity";
import { isEmpty } from "remeda";

import { urlForImage } from "../../../../lib/sanity";
import { fetchPublishingArtistPage } from "../../../../lib/sanity/queries";
import Pagination from "../../../components/publishing-artist-pagination";
import WorksTable from "../../../components/publishing-works-table";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
) {
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

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const artist = await fetchPublishingArtistPage({ slug: slug });

  const url = urlForImage(artist.coverImage).url();

  const webpUrl = urlForImage(artist.coverImage).format("webp").url();

  return (
    <div className="artist-single-page-layout grid border-b border-black dark:border-white lg:grid-cols-2">
      <div
        className="px-9 lg:border-b lg:border-black lg:px-10 lg:dark:border-white"
        style={{ gridArea: "name" }}
      >
        <h1 className="text-oxe-xxl-mobile/[3.75rem] lg:text-oxe-xxl/[6rem]">
          {artist.name}
        </h1>
      </div>

      {/* Mobile-only Full Bleed Image */}
      <div className="block lg:hidden" style={{ gridArea: "image" }}>
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

      <div className="px-9 py-7 lg:p-10" style={{ gridArea: "bio" }}>
        <picture className="mb-10 hidden lg:block">
          <source srcSet={webpUrl} type="image/webp" />
          <img
            className="aspect-[16/10] w-full max-w-4xl object-cover object-center"
            alt={artist.name}
            src={url}
            loading="lazy"
            decoding="async"
          />
        </picture>

        <div className="prose max-w-[unset] text-black prose-p:text-oxe-xs/5 prose-a:text-black prose-a:underline prose-strong:font-medium dark:text-white dark:prose-a:text-white lg:prose-p:text-oxe-md">
          <PortableText value={artist.body} />
        </div>

        {/* Mobile Only Table */}
        {!!artist.works && artist.works.tracks.length > 0 && (
          <div className="-mx-9 block pt-7 lg:hidden">
            <div className="mb-3 pl-9">
              <h3 className="text-oxe-sm font-medium uppercase lg:text-[2.1875rem]/[2rem]">
                Works
              </h3>
            </div>

            <WorksTable works={artist.works} name={artist.name} />
          </div>
        )}
      </div>

      <div
        className="flex min-h-[28rem] flex-col px-9 py-7 lg:grid lg:auto-rows-[minmax(max-content,calc(100svh/3))] lg:gap-20 lg:border-l lg:border-black lg:p-10 lg:dark:border-white"
        style={{ gridArea: "info" }}
      >
        {/* Desktop Only Table */}
        {!!artist.works && artist.works.tracks.length > 0 && (
          <div className="-mx-10 hidden lg:block">
            <div className="mb-6 pl-9">
              <h3 className="text-oxe-sm font-medium uppercase lg:text-[2.1875rem]/[2rem]">
                Works
              </h3>
            </div>

            <WorksTable works={artist.works} name={artist.name} />
          </div>
        )}

        {!isEmpty([...(artist?.projects ?? [])]) && (
          <div className="flex flex-1 items-start lg:flex-col">
            <div className="flex items-center gap-1.5 lg:gap-4">
              <div className="-mt-[0.1875rem] size-4 rounded-full border border-black bg-white dark:border-white lg:size-5"></div>

              <h3 className="text-oxe-sm font-medium uppercase lg:text-[2.1875rem]/[2rem]">
                Projects
              </h3>
            </div>

            <ul className="ml-auto text-right text-oxe-xs lg:ml-0 lg:pl-9 lg:text-left lg:text-oxe-sm/[2rem]">
              {artist.projects.map((link) => (
                <li key={link._key}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-start lg:flex-col">
          <div className="flex items-center gap-1.5 lg:gap-4">
            <div className="-mt-[0.1875rem] size-4 rounded-full border border-black bg-black dark:border-white lg:size-5"></div>

            <h3 className="text-oxe-sm font-medium uppercase lg:text-[2.1875rem]/[2rem]">
              More
            </h3>
          </div>

          <ul className="ml-auto text-right text-oxe-xs lg:ml-0 lg:pl-9 lg:text-left lg:text-oxe-sm/[2rem]">
            {[...(artist?.links ?? [])].map((link) => (
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
