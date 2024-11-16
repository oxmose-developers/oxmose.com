import { NEXT_TAGS } from "../../constants/tags";
import { ContactQuery } from "../../groq";
import { client } from ".";

export const fetchContactPage = async () =>
  client.fetch<ContactQuery>(
    ContactQuery,
    {},
    {
      next: { tags: [NEXT_TAGS.CONTACT] },
      cache:
        process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    },
  );
