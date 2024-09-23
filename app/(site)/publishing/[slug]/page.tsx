import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { isEmpty } from "remeda";

import { urlForImage } from "../../../../lib/sanity";
import {
  fetchPublishingArtistPage,
  fetchPublishingArtistsStaticParams,
} from "../loader";
import Pagination from "./components/Pagination";
import WorksTable from "./components/WorksTable";

// export async function generateStaticParams() {
//   const publishingArtists = await fetchPublishingArtistsStaticParams();

//   return publishingArtists.map((artist) => {
//     return {
//       params: { slug: artist.slug.current },
//     };
//   });
// }

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const publishingArtist = await fetchPublishingArtistPage({ slug: slug });

  if (!publishingArtist) {
    return notFound();
  }

  const url = urlForImage(publishingArtist.coverImage).url();

  const webpUrl = urlForImage(publishingArtist.coverImage).format("webp").url();

  return (
    <div className="artist-single-page-layout grid border-b border-black dark:border-white lg:grid-cols-2">
      <div
        className="px-9 lg:border-b lg:border-black lg:px-10 lg:dark:border-white"
        style={{ gridArea: "name" }}
      >
        <h1 className="text-oxe-xxl-mobile/[60px] lg:text-oxe-xxl/[96px]">
          {publishingArtist.name}
        </h1>
      </div>

      {/* Mobile-only Full Bleed Image */}
      <div className="block lg:hidden" style={{ gridArea: "image" }}>
        <picture className="block">
          <source srcSet={webpUrl} type="image/webp" />

          <img
            className="aspect-[16/10] w-full object-cover object-center"
            alt={publishingArtist.name}
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
            alt={publishingArtist.name}
            src={url}
            loading="lazy"
            decoding="async"
          />
        </picture>

        <div className="prose max-w-[unset] text-black prose-p:text-oxe-xs/5 prose-a:text-black prose-a:underline prose-strong:font-medium dark:text-white dark:prose-a:text-white lg:prose-p:text-oxe-md">
          <PortableText value={publishingArtist.body} />
        </div>

        {/* Mobile Only Table */}
        {!!publishingArtist.works &&
          publishingArtist.works.tracks.length > 0 && (
            <div className="-mx-9 block pt-7 lg:hidden">
              <div className="mb-3 pl-9">
                <h3 className="text-oxe-sm font-medium uppercase lg:text-[35px]/[32px]">
                  Works
                </h3>
              </div>

              <WorksTable
                works={publishingArtist.works}
                name={publishingArtist.name}
              />
            </div>
          )}
      </div>

      <div
        className="flex min-h-[28rem] flex-col px-9 py-7 lg:grid lg:auto-rows-[minmax(max-content,calc(100svh/3))] lg:gap-20 lg:border-l lg:border-black lg:p-10 lg:dark:border-white"
        style={{ gridArea: "info" }}
      >
        {/* Desktop Only Table */}
        {!!publishingArtist.works &&
          publishingArtist.works.tracks.length > 0 && (
            <div className="-mx-10 hidden lg:block">
              <div className="mb-6 pl-9">
                <h3 className="text-oxe-sm font-medium uppercase lg:text-[35px]/[32px]">
                  Works
                </h3>
              </div>

              <WorksTable
                works={publishingArtist.works}
                name={publishingArtist.name}
              />
            </div>
          )}

        {!isEmpty([...(publishingArtist?.projects ?? [])]) && (
          <div className="flex flex-1 items-start lg:flex-col">
            <div className="flex items-center gap-1.5 lg:gap-4">
              <div className="-mt-[3px] size-4 rounded-full border border-black bg-white dark:border-white lg:size-5"></div>

              <h3 className="text-oxe-sm font-medium uppercase lg:text-[35px]/[32px]">
                Projects
              </h3>
            </div>

            <ul className="ml-auto text-right text-oxe-xs lg:ml-0 lg:pl-9 lg:text-left lg:text-oxe-sm/[32px]">
              {publishingArtist.projects.map((link) => (
                <li key={link._key}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-start lg:flex-col">
          <div className="flex items-center gap-1.5 lg:gap-4">
            <div className="-mt-[3px] size-4 rounded-full border border-black bg-black dark:border-white lg:size-5"></div>

            <h3 className="text-oxe-sm font-medium uppercase lg:text-[35px]/[32px]">
              More
            </h3>
          </div>

          <ul className="ml-auto text-right text-oxe-xs lg:ml-0 lg:pl-9 lg:text-left lg:text-oxe-sm/[32px]">
            {[...(publishingArtist?.links ?? [])].map((link) => (
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
