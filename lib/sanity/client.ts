import { createClient, type QueryParams } from "next-sanity";

import {
  SANITY_API_VERSION,
  SANITY_DATASET_NAME,
  SANITY_PROJECT_ID,
} from "./config";

const IS_DEV = process.env.NODE_ENV === "development";

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET_NAME,
  apiVersion: SANITY_API_VERSION,
  useCdn: IS_DEV ? false : true,
});

export async function sanityFetch<const Result extends any>({
  query,
  params = {},
  revalidate = 60, // default revalidation time in seconds
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}): Promise<Result> {
  return client.fetch(query, params, {
    cache: IS_DEV ? "no-store" : "force-cache",
    next: {
      revalidate: tags.length ? undefined : revalidate, // for simple, time-based revalidation
      tags, // for tag-based revalidation
    },
  });
}
