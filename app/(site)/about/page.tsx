import Image from "next/image";
import { PortableText } from "next-sanity";

import CreditArticle from "./components/CreditArticle";
import { fetchAboutPage } from "./loader";
import teamPhoto from "./team-photo.webp";

export const dynamic = "force-static";

export default async function Page() {
  const page = await fetchAboutPage();

  return (
    <>
      <h1 hidden>{`${page.title} | Oxmose`}</h1>

      <section className="about-page-section flex items-center border-b border-black p-9 lg:p-10">
        <div className="text-oxe-md lg:text-oxe-xxl/[85px]">
          <PortableText value={page.part1} />
        </div>
      </section>

      <section className="about-page-section divide-black border-b border-black p-9 lg:grid lg:grid-cols-2 lg:divide-x lg:p-0">
        <div className="mb-5 space-y-5 lg:mb-0 lg:space-y-10 lg:p-10">
          {page.part2.left.map((credit) => (
            <CreditArticle key={credit._key} credit={credit} />
          ))}
        </div>

        <div className="space-y-5 lg:space-y-10 lg:p-10">
          {page.part2.right.map((credit) => (
            <CreditArticle key={credit._key} credit={credit} />
          ))}
        </div>
      </section>

      <section className="about-page-section flex items-center border-b border-black p-9 lg:p-10">
        <div className="text-oxe-md lg:text-oxe-xxl/[85px]">
          <PortableText value={page.part3} />
        </div>
      </section>

      <section className="about-page-section divide-black border-b border-black p-9 lg:grid lg:grid-cols-2 lg:divide-x lg:p-0">
        <div className="mb-5 space-y-5 lg:mb-0 lg:space-y-10 lg:p-10">
          {page.part4.left.map((credit) => (
            <CreditArticle key={credit._key} credit={credit} />
          ))}
        </div>

        <div className="space-y-5 lg:space-y-10 lg:p-10">
          {page.part4.right.map((credit) => (
            <CreditArticle key={credit._key} credit={credit} />
          ))}
        </div>
      </section>

      <section className="about-page-section flex items-center border-b border-black p-9 lg:p-10">
        <div className="text-oxe-md lg:text-oxe-xxl/[85px]">
          <PortableText value={page.part5} />
        </div>
      </section>

      <section className="relative min-h-svh">
        <Image
          alt="Team photo"
          className="object-cover"
          fill
          loading="lazy"
          placeholder="blur"
          priority={false}
          quality={100}
          sizes="100vw"
          src={teamPhoto}
        />
      </section>
    </>
  );
}
