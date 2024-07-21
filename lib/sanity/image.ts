export { urlForImage };

import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

import { SANITY_DATASET_NAME, SANITY_PROJECT_ID } from "./config";

const imageBuilder = createImageUrlBuilder({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET_NAME,
});

const urlForImage = (source: Image) => {
  return imageBuilder?.image(source).auto("format").fit("max");
};

export function resolveOpenGraphImage(
  image: Image,
  width = 1200,
  height = 627,
) {
  if (!image) {
    return;
  }

  const url = urlForImage(image)?.width(1200).height(627).fit("crop").url();

  if (!url) {
    return;
  }

  return {
    url,
    alt: image?.alt as string,
    width,
    height,
  };
}
