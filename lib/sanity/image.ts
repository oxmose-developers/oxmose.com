export { urlForImage };

import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

import { SANITY_DATASET_NAME, SANITY_PROJECT_ID } from "./config";

const imageBuilder = createImageUrlBuilder({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET_NAME,
});

const urlForImage = (source: Image) => {
  return imageBuilder?.image(source).fit("max");
};
