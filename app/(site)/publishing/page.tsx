import type { Metadata, ResolvingMetadata, Viewport } from "next";
import { PortableText } from "next-sanity";
// import Image from "next/image";
import { Suspense } from "react";

import { publishingLicenseRequestEmail } from "../../../constants/urls";
import { fetchPublishingPage } from "../../../lib/sanity";
import PublishingArtistsList from "../../components/publishing-artist-list";
import PublishingVideo from "../../components/publishing-video";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export async function generateMetadata(
  props: { params: {} },
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

      <section className="flex min-h-[25rem] flex-col border-b border-white bg-black px-9 py-5 text-white lg:min-h-[60rem] lg:justify-center lg:p-10 lg:py-16">
        <h2 className="mb-2.5 text-[1.875rem]/[1.375] lg:mb-52 lg:text-[10.625rem]/[1.2]">
          {page.creativeServicesSection.title}
        </h2>

        <div className="text-[1.125rem]/[1.25rem] lg:text-[3.75rem]/[4.0625rem]">
          <PortableText value={page.creativeServicesSection.content} />
        </div>
      </section>

      <section className="flex min-h-[25rem] flex-col border-b border-white bg-black px-9 py-5 text-white lg:min-h-[60rem] lg:justify-center lg:p-10 lg:py-16">
        <h2 className="mb-2.5 text-[1.875rem]/[1.375] lg:mb-52 lg:text-[10.625rem]/[1.2]">
          {page.scoreSection.title}
        </h2>

        <div className="text-[1.125rem]/[1.25rem] lg:text-[3.75rem]/[4.0625rem]">
          <PortableText value={page.scoreSection.content} />
        </div>

        <p className="mt-auto text-right text-[1.875rem]/[1.375] lg:mt-0 lg:text-left lg:text-[3.75rem]/[4.0625rem]">
          <a href={page.scoreSection.link.href}>
            {page.scoreSection.link.name}
          </a>
        </p>
      </section>

      <section className="flex min-h-[16rem] flex-col bg-black px-9 py-5 text-white lg:min-h-[60rem] lg:justify-center lg:p-10 lg:py-16">
        <h2 className="mb-2.5 text-[1.875rem]/[1.375] lg:mb-52 lg:text-[10.625rem]/[1.2]">
          {page.syncSection.title}
        </h2>

        <div className="text-[1.125rem]/[1.25rem] lg:text-[3.75rem]/[4.0625rem]">
          <PortableText value={page.syncSection.content} />
        </div>
      </section>

      <section className="relative min-h-[12rem] overflow-hidden lg:min-h-[54rem]">
        <PublishingVideo />
      </section>

      <section className="border-b border-t border-white bg-black text-white lg:border-t-0">
        <div className="px-9 pb-5 pt-4 lg:mb-28 lg:py-0">
          <h2 className="text-[1.875rem]/[1.375] lg:text-[10.625rem]/[1.375]">
            Artists
          </h2>
        </div>

        <ul className="divide-y divide-white border-t">
          <Suspense>
            <PublishingArtistsList />
          </Suspense>

          <li>
            <a
              href={`mailto:${publishingLicenseRequestEmail}`}
              className="block px-9 py-4 text-[1.875rem]/[2.5rem] hover:bg-white hover:text-black lg:py-0 lg:text-[10.625rem]/[1.375]"
            >
              License request +
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}
