import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { PortableText } from "next-sanity";

import { fetchAboutPage } from "../../lib/sanity";
import CreditArticle from "../components/about-credit-article";
import teamPhoto from "./team-photo-enlarged.jpg";

export async function generateMetadata(
  props: { params: Promise<{}> },
  parent: ResolvingMetadata,
) {
  const existingMetadata = (await parent) as unknown as Metadata;

  const page = await fetchAboutPage();

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
  const page = await fetchAboutPage();

  return (
    <>
      <h1 hidden>{`${page.title} | Oxmose`}</h1>

      <section className="about-page-section flex items-center border-b border-black p-9 md:p-10">
        <div className="text-oxe-md md:text-[4.75rem]/20.5">
          <PortableText value={page.part1} />
        </div>
      </section>

      <section className="about-page-section divide-black border-b border-black p-9 md:grid md:grid-cols-2 md:divide-x md:p-0">
        <div className="mb-5 space-y-5 md:mb-0 md:space-y-10 md:p-10">
          {page.part2.left.map((credit) => (
            <CreditArticle key={credit._key} credit={credit} />
          ))}
        </div>

        <div className="space-y-5 md:space-y-10 md:p-10">
          {page.part2.right.map((credit) => (
            <CreditArticle key={credit._key} credit={credit} />
          ))}
        </div>
      </section>

      <section className="about-page-section flex items-center border-b border-black p-9 md:p-10">
        <div className="text-oxe-md md:text-[4.75rem]/20.5">
          <PortableText value={page.part3} />
        </div>
      </section>

      <section className="about-page-section divide-black border-b border-black p-9 md:grid md:grid-cols-2 md:divide-x md:p-0">
        <div className="mb-5 space-y-5 md:mb-0 md:space-y-10 md:p-10">
          {page.part4.left.map((credit) => (
            <CreditArticle key={credit._key} credit={credit} />
          ))}
        </div>

        <div className="space-y-5 md:space-y-10 md:p-10">
          {page.part4.right.map((credit) => (
            <CreditArticle key={credit._key} credit={credit} />
          ))}
        </div>
      </section>

      <section className="about-page-section flex items-center border-b border-black p-9 md:p-10">
        <div className="text-oxe-md md:text-[4.75rem]/20.5">
          <PortableText value={page.part5} />
        </div>
      </section>

      <section className="relative">
        <Image
          alt="Team photo"
          className="max-h-[calc(100vh-var(--footer-height))] object-cover object-bottom 2xl:object-center"
          loading="lazy"
          priority={false}
          sizes="100vw"
          src={teamPhoto}
        />
      </section>
    </>
  );
}
