import { ContactQuery } from "../../../groq";
import { client } from "../../../lib/sanity";

export const fetchContactPage = async () =>
  client.fetch<ContactQuery>(
    ContactQuery,
    {},
    {
      next: { tags: ["contact"] },
      cache: process.env.NODE_ENV === "development" ? "no-store" : undefined,
    },
  );
