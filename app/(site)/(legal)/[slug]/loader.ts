import { LegalPageQuery, LegalStaticParamsQuery } from "../../../../groq";
import { client } from "../../../../lib/sanity";

export const fetchLegalStaticParams = async () =>
  client.fetch<LegalStaticParamsQuery>(
    LegalStaticParamsQuery,
    {},
    {
      next: { tags: ["legalStaticParams"] },
      cache: process.env.NODE_ENV === "development" ? "no-store" : undefined,
    },
  );

export const fetchLegalPage = async ({ slug }: { slug: string }) =>
  client.fetch<LegalPageQuery>(
    LegalPageQuery,
    { slug },
    {
      next: { tags: [slug] },
      cache: process.env.NODE_ENV === "development" ? "no-store" : undefined,
    },
  );
