import type { Metadata, ResolvingMetadata } from "next";
import { PortableText } from "next-sanity";

import { fetchContactPage } from "../../../lib/sanity";

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
      <section className="flex-1 divide-y divide-black border-black lg:grid lg:grid-cols-2 lg:divide-x lg:divide-y-0">
        <div className="p-9 lg:p-10">
          <h1 className="mb-5 text-oxe-lg lg:text-oxe-xxl">
            {page.generalSection.title}
          </h1>

          <p className="mb-8 text-oxe-md lg:mb-20 lg:text-oxe-lg">
            <a href={page.generalSection.link.href}>
              {page.generalSection.link.name}
            </a>
          </p>

          <div className="text-oxe-xs lg:text-oxe-md">
            <PortableText value={page.generalSection.content} />
          </div>
        </div>

        <div className="flex flex-col p-9 lg:p-10 xl:p-16">
          <dl className="flex flex-1 flex-col justify-between gap-10 xl:mt-auto xl:flex-initial xl:flex-row xl:gap-5">
            {page.locations.map((location, idx) => (
              <div
                className="text-oxe-sm lg:text-oxe-lg"
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
