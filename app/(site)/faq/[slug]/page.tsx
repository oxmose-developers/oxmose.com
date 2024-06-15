import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";

import { fetchFaqs } from "../loader";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const faqs = await fetchFaqs();

  return faqs.map((faq) => {
    return {
      params: {
        slug: faq.slug.current,
      },
    };
  });
}

export default async function Page({ params }: { params: { slug: string } }) {
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
    <div className="lg:item-stretch flex-1 lg:flex lg:flex-row lg:divide-x lg:divide-black">
      <h1 hidden>{title}</h1>

      <ul className="hidden flex-1 divide-y divide-black lg:block">
        {categories.map((el) => (
          <li key={el._id} className="px-10 text-oxe-xxl/[96px] last:!border-b">
            <Link href={`/faq/${el.slug.current}`}>{el.category}</Link>
          </li>
        ))}
      </ul>

      <div className="flex-1 divide-y divide-black lg:divide-y-reverse">
        {categories.map((el) => (
          <Fragment key={el._id}>
            <Link
              className="block w-full px-9 text-left text-oxe-xxl-mobile/[60px] lg:hidden"
              href={`/faq/${el.slug.current}`}
            >
              {el.category}
            </Link>

            {el.slug.current === slug && (
              <article className="space-y-9 p-9 text-oxe-xs/5 lg:space-y-10 lg:border-none lg:p-10 lg:text-oxe-sm">
                {faq.questions.map((qa) => (
                  <div key={qa._id} className="space-y-4">
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
