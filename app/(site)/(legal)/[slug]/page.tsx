import type { Metadata, ResolvingMetadata } from "next";
import { PortableText } from "next-sanity";

import { fetchLegalPage } from "../../../../lib/sanity";
import Prose from "../../../components/legal-prose";

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
) {
  const params = await props.params;
  const existingMetadata = (await parent) as unknown as Metadata;

  const { slug } = params;

  const page = await fetchLegalPage({ slug });

  return {
    title: page.title,
    openGraph: {
      ...existingMetadata.openGraph,
      title: page.title,
    },
    twitter: {
      ...existingMetadata.twitter,
      title: page.title,
    },
    robots: {
      index: false,
      follow: false,
    },
  } satisfies Metadata;
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;

  const page = await fetchLegalPage({ slug });

  return (
    <div className="divide-y divide-black lg:grid lg:grid-cols-2 lg:divide-x lg:divide-y-0">
      <section lang="en" className="p-9 lg:p-10">
        <div className="mb-10 flex gap-8 lg:mb-28">
          <h2 className="max-w-2xl flex-1 text-balance text-oxe-md-plus leading-none lg:text-oxe-xxl">
            {page.englishTitle}
          </h2>

          <p className="shrink-0 text-oxe-md-plus leading-none lg:text-oxe-xxl">
            En
          </p>
        </div>

        <Prose>
          <PortableText value={page.englishContent} />
        </Prose>
      </section>

      <section lang="fr" className="p-9 lg:p-10">
        <div className="mb-10 flex gap-8 lg:mb-28">
          <h2 className="max-w-2xl flex-1 text-balance text-oxe-md-plus leading-none lg:text-oxe-xxl">
            {page.frenchTitle}
          </h2>

          <p className="shrink-0 text-oxe-md-plus leading-none lg:text-oxe-xxl">
            Fr
          </p>
        </div>

        <Prose>
          <PortableText value={page.frenchContent} />
        </Prose>
      </section>
    </div>
  );
}
