import type { Metadata, ResolvingMetadata } from "next";
import { PortableText } from "next-sanity";

import { fetchContactPage } from "../../lib/sanity";

export async function generateMetadata(
  props: { params: Promise<{}> },
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
      <section className="flex-1 divide-y divide-black border-black md:grid md:grid-cols-2 md:divide-x md:divide-y-0">
        <div className="p-9 md:p-10">
          <h1 className="mb-5 text-oxe-xxl md:text-oxe-xxxxl">
            {page.generalSection.title}
          </h1>

          <p className="mb-8 text-oxe-md md:mb-20 md:text-oxe-xxl">
            {/* @mailto is set on CMS */}
            <a href={page.generalSection.link.href}>
              {page.generalSection.link.name}
            </a>
          </p>

          <div className="text-oxe-xxs md:text-oxe-md">
            <PortableText
              value={page.generalSection.content}
              components={{ types: { blockBreak: () => <br /> } }}
            />
          </div>
        </div>

        <div className="flex flex-col p-9 md:p-10 xl:p-16">
          <dl className="flex flex-1 flex-col justify-between gap-10 md:mt-auto md:flex-initial md:flex-row md:gap-5">
            {page.locations.map((location, idx) => (
              <div
                className="text-oxe-sm md:text-oxe-xxl"
                key={`${location.name}-${idx}`}
              >
                <dt className="font-medium">{location.type}</dt>
                <dd>
                  <p>{location.name}</p>

                  <br />

                  <p>
                    <a href={`tel:${location.phone}`}>{location.phone}</a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
