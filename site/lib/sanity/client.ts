import { createClient, type QueryParams } from "next-sanity";

import {
  SANITY_API_VERSION,
  SANITY_DATASET_NAME,
  SANITY_PROJECT_ID,
} from "./config";

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET_NAME,
  apiVersion: SANITY_API_VERSION,
  useCdn: process.env.USE_SANITY_CDN === "1",
});

export async function sanityFetch<const Result extends any>({
  query,
  params = {},
  revalidate = 60, // default revalidation time in seconds
  tags = [],
  cache = "force-cache",
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
  cache?: RequestCache;
}): Promise<Result> {
  return client.fetch(query, params, {
    cache: cache,
    next: {
      revalidate: tags.length > 0 ? undefined : revalidate, // for simple, time-based revalidation
      tags, // for tag-based revalidation
    },
  });
}

// Using typegen types, but its not ideal atm, too many undefined things
//
// export async function sanityFetch<const QueryString extends string>({
//   query,
//   params = {},
//   revalidate = 60, // default revalidation time in seconds
//   tags = [],
// }: {
//   query: QueryString;
//   params?: QueryParams | Promise<QueryParams>;
//   revalidate?: number | false;
//   tags?: string[];
// }): Promise<ClientReturn<QueryString>> {
//   return client.fetch(query, params, {
//     cache: IS_DEV ? "no-store" : "force-cache",
//     next: {
//       revalidate: tags.length ? undefined : revalidate, // for simple, time-based revalidation
//       tags, // for tag-based revalidation
//     },
//   });
// }
