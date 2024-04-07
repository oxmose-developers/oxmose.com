import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

import { LegalQuery } from "../../../../groq";
import { client } from "../../../../lib/sanity";
import Prose from "../../../shared/Prose";

export async function generateStaticParams() {
  const pages = await client.fetch<LegalQuery>(LegalQuery);

  return pages.map((page) => {
    return {
      params: {
        slug: page.slug.current,
      },
    };
  });
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const pages = await client.fetch<LegalQuery>(LegalQuery);

  const page = pages.find((page) => page.slug.current === slug);

  if (!page) {
    return notFound();
  }

  return (
    <div className="grid grid-cols-2 divide-x divide-black">
      <section lang="en" className="p-10">
        <div className="mb-28 flex gap-8">
          <h2 className="flex-1 text-oxe-xxl leading-none">
            {page.englishTitle}
          </h2>

          <p className="shrink-0 text-oxe-xxl leading-none">En</p>
        </div>

        <Prose>
          <PortableText value={page.englishContent} />
        </Prose>
      </section>

      <section lang="fr" className="p-10">
        <div className="mb-28 flex gap-8">
          <h2 className="flex-1 text-oxe-xxl leading-none">
            {page.frenchTitle}
          </h2>

          <p className="shrink-0 text-oxe-xxl leading-none">Fr</p>
        </div>

        <Prose>
          <PortableText value={page.frenchContent} />
        </Prose>
      </section>
    </div>
  );
}
