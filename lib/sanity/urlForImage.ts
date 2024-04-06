export { imageBuilder, urlForImage };

import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "./client";

const imageBuilder = imageUrlBuilder(client);

function urlForImage(source: SanityImageSource) {
  return imageBuilder.image(source);
}
