import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { Suspense } from "react";

import { publishingLicenseRequestEmail } from "../../../constants/urls";
import { PublishingQuery } from "../../../groq";
import { client, urlForImage } from "../../../lib/sanity";
import PublishingArtistsList from "./components/PublishingArtistsList";

export default async function Page() {
  const page = await client.fetch<PublishingQuery>(
    PublishingQuery,
    {},
    {
      next: { tags: ["publishing"] },
      cache: process.env.NODE_ENV === "development" ? "no-store" : undefined,
    },
  );

  const webpUrl = urlForImage(page.artistsHeroImage).format("webp").url();

  return (
    <>
      <h1 hidden>{`${page.title} | Oxmose`}</h1>

      <section className="flex min-h-[25rem] flex-col border-b border-white bg-black px-9 py-5 text-white lg:min-h-[60rem] lg:justify-center lg:p-10 lg:py-16">
        <h2 className="mb-2.5 text-[30px]/[1.375] lg:mb-52 lg:text-[170px]/[1.2]">
          {page.creativeServicesSection.title}
        </h2>

        <div className="text-[18px]/[20px] lg:text-[60px]/[65px]">
          <PortableText value={page.creativeServicesSection.content} />
        </div>
      </section>

      <section className="flex min-h-[25rem] flex-col border-b border-white bg-black px-9 py-5 text-white lg:min-h-[60rem] lg:justify-center lg:p-10 lg:py-16">
        <h2 className="mb-2.5 text-[30px]/[1.375] lg:mb-52 lg:text-[170px]/[1.2]">
          {page.scoreSection.title}
        </h2>

        <div className="text-[18px]/[20px] lg:text-[60px]/[65px]">
          <PortableText value={page.scoreSection.content} />
        </div>

        <p className="mt-auto text-right text-[30px]/[1.375] lg:mt-0 lg:text-left lg:text-[60px]/[65px]">
          <a href={page.scoreSection.link.href}>
            {page.scoreSection.link.name}
          </a>
        </p>
      </section>

      <section className="flex min-h-[16rem] flex-col bg-black px-9 py-5 text-white lg:min-h-[60rem] lg:justify-center lg:p-10 lg:py-16">
        <h2 className="mb-2.5 text-[30px]/[1.375] lg:mb-52 lg:text-[170px]/[1.2]">
          {page.syncSection.title}
        </h2>

        <div className="text-[18px]/[20px] lg:text-[60px]/[65px]">
          <PortableText value={page.syncSection.content} />
        </div>
      </section>

      <section className="relative min-h-[12rem] bg-white lg:min-h-[60rem]">
        <Image
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          src={webpUrl}
          unoptimized
          className="object-cover"
        />
      </section>

      <section className="border-b border-t border-white bg-black text-white lg:border-t-0">
        <div className="px-9 pb-5 pt-4 lg:mb-28 lg:py-0">
          <h2 className="text-[30px]/[1.375] lg:text-[170px]/[1.375]">
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
              className="block px-9 py-4 text-[30px]/[40px] hover:bg-white hover:text-black lg:py-0 lg:text-[170px]/[1.375]"
            >
              License request +
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}
