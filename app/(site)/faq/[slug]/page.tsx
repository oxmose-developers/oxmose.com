import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { Fragment } from "react";

import { fetchFaq, fetchFaqs } from "../../../../lib/sanity";

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
) {
  const params = await props.params;
  const existingMetadata = (await parent) as unknown as Metadata;

  const { slug } = params;

  const faq = await fetchFaq({ slug });

  return {
    title: `${faq.category} — FAQ`,
    openGraph: {
      ...existingMetadata.openGraph,
      title: `${faq.category} — FAQ`,
    },
    twitter: {
      ...existingMetadata.twitter,
      title: `${faq.category} — FAQ`,
    },
  } satisfies Metadata;
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;

  const faqs = await fetchFaqs();

  const categories = faqs.map((faq) => ({
    _id: faq._id,
    slug: faq.slug,
    category: faq.category,
  }));

  const faq = faqs.find((el) => el.slug.current === slug);

  if (!faq) {
    return notFound();
  }

  const title = `${faq.category} | FAQ | Oxmose`;

  return (
    <div className="md:item-stretch flex-1 md:flex md:flex-row md:divide-x md:divide-black">
      <h1 hidden>{title}</h1>

      <ul className="hidden flex-1 divide-y divide-black md:block">
        {categories.map((el) => (
          <li key={el._id} className="px-10 text-oxe-xxl/[6rem] last:!border-b">
            <Link href={`/faq/${el.slug.current}`}>{el.category}</Link>
          </li>
        ))}
      </ul>

      <div className="flex-1 divide-y divide-black md:divide-y-reverse">
        {categories.map((el, idx) => (
          <Fragment key={`${el._id}-${idx}-category`}>
            <Link
              className="block w-full px-9 text-left text-oxe-xxl-mobile/[3.75rem] md:hidden"
              href={`/faq/${el.slug.current}`}
            >
              {el.category}
            </Link>

            {el.slug.current === slug && (
              <article className="space-y-9 p-9 text-oxe-xs/5 md:space-y-10 md:border-none md:p-10 md:text-oxe-sm">
                {faq.questions.map((qa, idx) => (
                  <div key={`${qa._id}-${idx}-question`} className="space-y-4">
                    <h4 className="-mb-4 font-medium">{qa.question}</h4>

                    <PortableText value={qa.answer} />
                  </div>
                ))}
              </article>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
