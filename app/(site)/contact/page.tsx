import type { Metadata, ResolvingMetadata } from "next";
import lazy from "next/dynamic";
import { PortableText } from "next-sanity";
import { Suspense } from "react";

import { fetchContactPage } from "../../../lib/sanity/queries";
import DownloadLink from "../../components/download-link";

const OxmosePageAnimation = lazy(
  () => import("../../components/oxmose-page-animation"),
  { ssr: false },
);

export async function generateMetadata(
  props: { params: {} },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const existingMetadata = (await parent) as unknown as Metadata;

  const page = await fetchContactPage();

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
  const page = await fetchContactPage();

  return (
    <>
      <h1 hidden>{`${page.title} | Oxmose`}</h1>

      <section className="flex min-h-96 flex-col border-b border-black p-9 lg:min-h-[30rem] lg:p-10">
        <h2 className="mb-1.5 text-oxe-md lg:mb-10 lg:text-oxe-xxl">
          {page.generalSection.title}
        </h2>

        <div className="text-oxe-sm lg:text-oxe-lg">
          <PortableText value={page.generalSection.content} />
        </div>

        <p className="mt-auto text-right text-oxe-md lg:text-oxe-xxl">
          <a href={page.generalSection.link.href}>
            {page.generalSection.link.name}
          </a>
        </p>
      </section>

      <section className="flex min-h-96 flex-col gap-12 divide-black border-b border-black p-9 lg:grid lg:min-h-[32rem] lg:grid-cols-2 lg:gap-0 lg:divide-x lg:p-0">
        <div className="flex lg:p-10">
          <h3 className="flex-1 text-oxe-md lg:text-oxe-xxl">Listen</h3>

          <ul className="flex-1 lg:ml-auto lg:list-inside lg:list-disc lg:self-end">
            {page.listenLinks.map((link) => (
              <li
                key={link._key}
                className="whitespace-nowrap text-oxe-sm lg:text-oxe-lg"
              >
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex lg:p-10">
          <h3 className="flex-1 text-oxe-md lg:text-oxe-xxl">Follow</h3>

          <ul className="flex-1 lg:ml-auto lg:list-inside lg:list-disc lg:self-end">
            {page.followLinks.map((link) => (
              <li
                key={link._key}
                className="whitespace-nowrap text-oxe-sm lg:text-oxe-lg"
              >
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex min-h-96 flex-col border-b border-black p-9 lg:min-h-[30rem] lg:p-10">
        <h2 className="mb-1.5 text-oxe-md lg:mb-10 lg:text-oxe-xxl">
          {page.demoSection.title}
        </h2>

        <div className="text-oxe-sm lg:text-oxe-lg">
          <PortableText value={page.demoSection.content} />
        </div>

        <p className="mt-auto text-right text-oxe-md lg:text-oxe-xxl">
          <a href={page.demoSection.link.href}>{page.demoSection.link.name}</a>
        </p>
      </section>

      <section className="divide-y divide-black border-b border-black lg:grid lg:grid-cols-2 lg:divide-x lg:divide-y-0">
        <div className="flex min-h-96 flex-row p-9 lg:min-h-[32rem] lg:flex-col lg:p-10">
          <h3 className="flex-1 text-oxe-md lg:flex-auto lg:text-oxe-xxl">
            Location
          </h3>

          <div className="flex flex-1 flex-col justify-between gap-10 lg:mt-auto lg:flex-initial lg:flex-row">
            <dl>
              <dt className="text-oxe-sm font-medium lg:text-oxe-lg">
                Headquarters
              </dt>
              <dd className="text-oxe-sm lg:text-oxe-lg">Paris</dd>
            </dl>

            <dl>
              <dt className="text-oxe-sm font-medium lg:text-oxe-lg">
                Office/Studio
              </dt>
              <dd className="text-oxe-sm lg:text-oxe-lg">Bucharest</dd>
            </dl>
          </div>
        </div>

        <div className="flex min-h-96 flex-col p-9 lg:min-h-[32rem] lg:p-10">
          <h3 className="text-oxe-md lg:text-oxe-xxl">{page.pressKit.name}</h3>

          <p className="mt-auto text-right text-oxe-md lg:text-oxe-xxl">
            <DownloadLink href={page.pressKit.href}>download</DownloadLink>
          </p>
        </div>
      </section>

      <section className="flex min-h-96 flex-col border-b border-black p-9 lg:min-h-[30rem] lg:p-10">
        <h2 className="mb-1.5 text-oxe-md lg:mb-10 lg:text-oxe-xxl">
          {page.syncSection.title}
        </h2>

        <div className="text-oxe-sm lg:text-oxe-lg">
          <PortableText value={page.syncSection.content} />
        </div>

        <p className="mt-auto text-right text-oxe-md lg:text-oxe-xxl">
          <a href={page.syncSection.link.href}>{page.syncSection.link.name}</a>
        </p>
      </section>

      <section className="flex min-h-96 flex-col items-center justify-center p-9 lg:min-h-[45rem] lg:p-10">
        <Suspense fallback={null}>
          <OxmosePageAnimation />
        </Suspense>
      </section>
    </>
  );
}
