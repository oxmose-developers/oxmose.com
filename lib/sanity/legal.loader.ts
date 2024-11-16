import { notFound } from "next/navigation";

import { NEXT_TAGS } from "../../constants/tags";
import { LegalPageQuery, LegalStaticParamsQuery } from "../../groq";
import { client } from ".";

export const fetchLegalStaticParams = async () =>
  client.fetch<LegalStaticParamsQuery>(
    LegalStaticParamsQuery,
    {},
    {
      next: { tags: [NEXT_TAGS.LEGAL_STATIC_PARAMS] },
      cache:
        process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    },
  );

export const fetchLegalPage = async ({ slug }: { slug: string }) => {
  const data = await client.fetch<LegalPageQuery>(
    LegalPageQuery,
    { slug },
    {
      next: { tags: [slug] },
      cache:
        process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    },
  );

  if (!data) {
    return notFound();
  }

  return data;
};
