export { client };

import { createClient } from "next-sanity";

import {
  SANITY_API_VERSION,
  SANITY_DATASET_NAME,
  SANITY_PROJECT_ID,
} from "./config";

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET_NAME,
  apiVersion: SANITY_API_VERSION,
  useCdn: false,
  perspective: "published",
});
