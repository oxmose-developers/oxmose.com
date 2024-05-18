import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

import { publishingLicenseRequestEmail } from "../../../constants/urls";
import { PublishingQuery } from "../../../groq";
import { client, urlForImage } from "../../../lib/sanity";

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

      <section className="flex flex-col justify-center border-b border-white bg-black p-9 text-white lg:min-h-[60rem] lg:p-10 lg:py-16">
        <h2 className="mb-52 text-[170px]/[85px]">
          {page.creativeServicesSection.title}
        </h2>

        <div className="text-[60px]/[65px]">
          <PortableText value={page.creativeServicesSection.content} />
        </div>
      </section>

      <section className="flex flex-col justify-center border-b border-white bg-black p-9 text-white lg:min-h-[60rem] lg:p-10 lg:py-16">
        <h2 className="mb-52 text-[170px]/[85px]">{page.scoreSection.title}</h2>

        <div className="text-[60px]/[65px]">
          <PortableText value={page.scoreSection.content} />
        </div>
      </section>

      <section className="flex flex-col justify-center bg-black p-9 text-white lg:min-h-[60rem] lg:p-10 lg:py-16">
        <h2 className="mb-52 text-[170px]/[85px]">{page.syncSection.title}</h2>

        <div className="text-[60px]/[65px]">
          <PortableText value={page.syncSection.content} />
        </div>
      </section>

      <section className="relative bg-white lg:min-h-[60rem]">
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

      <section className="border-b border-white bg-black text-white">
        <div className="mb-28 px-9">
          <h2 className="text-[170px]/[1.375]">Artists</h2>
        </div>

        <ul className="divide-y divide-white border-t">
          <li>
            <Link
              href="#!"
              className="block px-9 text-[80px]/[96px] hover:bg-white hover:text-black"
            >
              {"Nahal Kavand"}
            </Link>
          </li>

          <li>
            <Link
              href="#!"
              className="block px-9 text-[80px]/[96px] hover:bg-white hover:text-black"
            >
              {"Nahal Kavand"}
            </Link>
          </li>

          <li>
            <a
              href={`mailto:${publishingLicenseRequestEmail}`}
              className="block px-9 text-[170px]/[1.375] hover:bg-white hover:text-black"
            >
              License request +
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}
