import type { Metadata, ResolvingMetadata, Viewport } from "next";
import { PortableText } from "next-sanity";
import { Suspense } from "react";

import { fetchPublishingPage } from "../../lib/sanity";
import PublishingArtistsList from "../components/publishing-artist-list";
import PublishingVideo from "../components/publishing-video";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export async function generateMetadata(
  props: { params: Promise<{}> },
  parent: ResolvingMetadata,
) {
  const existingMetadata = (await parent) as unknown as Metadata;

  const page = await fetchPublishingPage();

  return {
    title: page.title,
    description: page.overview,
    openGraph: {
      ...existingMetadata.openGraph,
      title: page.title,
      description: page.overview,
    },
    twitter: {
      ...existingMetadata.twitter,
      title: page.title,
      description: page.overview,
    },
  } satisfies Metadata;
}

export default async function Page() {
  const page = await fetchPublishingPage();

  return (
    <>
      <h1 hidden>{`${page.title} | Oxmose`}</h1>

      <section className="flex min-h-[25rem] flex-col border-b border-white bg-black px-9 py-5 text-white md:min-h-[60rem] md:justify-center md:p-10 md:py-16">
        <h2 className="mb-2.5 text-oxe-md/snug md:mb-52 md:text-oxe-xxxxxl/tighter">
          {page.creativeServicesSection.title}
        </h2>

        <div className="text-oxe-xxs/5 md:text-oxe-xxxl/16">
          <PortableText value={page.creativeServicesSection.content} />
        </div>
      </section>

      <section className="flex min-h-[25rem] flex-col border-b border-white bg-black px-9 py-5 text-white md:min-h-[60rem] md:justify-center md:p-10 md:py-16">
        <h2 className="mb-2.5 text-oxe-md/snug md:mb-52 md:text-oxe-xxxxxl/tighter">
          {page.scoreSection.title}
        </h2>

        <div className="text-oxe-xxs/5 md:text-oxe-xxxl/16">
          <PortableText value={page.scoreSection.content} />
        </div>

        <p className="mt-auto text-right text-oxe-md/snug md:mt-0 md:text-left md:text-oxe-xxxl/16">
          <a href={page.scoreSection.link.href}>
            {page.scoreSection.link.name}
          </a>
        </p>
      </section>

      <section className="flex min-h-64 flex-col bg-black px-9 py-5 text-white md:min-h-[60rem] md:justify-center md:p-10 md:py-16">
        <h2 className="mb-2.5 text-oxe-md/snug md:mb-52 md:text-oxe-xxxxxl/tighter">
          {page.syncSection.title}
        </h2>

        <div className="text-oxe-xxs/5 md:text-oxe-xxxl/16">
          <PortableText value={page.syncSection.content} />
        </div>
      </section>

      <section className="relative min-h-48 overflow-hidden md:min-h-[54rem]">
        <PublishingVideo />
      </section>

      <section className="border-b border-t border-white bg-black text-white md:border-t-0">
        <div className="px-9 pb-5 pt-4 md:mb-28 md:py-0">
          <h2 className="text-oxe-md/snug md:text-oxe-xxxxxl/snug">Artists</h2>
        </div>

        <ul className="divide-y divide-white border-t">
          {/* @ts-expect-error Ignore this, non-issue */}
          <Suspense>
            <PublishingArtistsList />
          </Suspense>

          <li>
            <a
              href={`mailto:${page.licenseRequestEmail}`}
              className="block px-9 py-4 text-oxe-md/10 hover:bg-white hover:text-black md:py-0 md:text-oxe-xxxxxl/snug"
            >
              License request +
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}
