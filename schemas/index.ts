import artist from "./artist";
import faqs from "./faqs";
import legal from "./legal";
import accessibleImage from "./objects/accessibleImage";
import blockContent from "./objects/blockContent";
import contentSection from "./objects/contentSection";
import credits from "./objects/credits";
import item from "./objects/item";
import link from "./objects/link";
import metaDescription from "./objects/metaDescription";
import questionAnswer from "./objects/questionAnswer";
import releaseDate from "./objects/releaseDate";
import track from "./objects/track";
import trackList from "./objects/trackList";
import twoColumn from "./objects/twoColumn";
import release from "./release";
import about from "./singletons/about";
import contact from "./singletons/contact";

export const schemaTypes = [
  // singleton document types
  about,
  contact,
  // regular document types
  artist,
  release,
  faqs,
  legal,
  // objects
  accessibleImage,
  link,
  blockContent,
  credits,
  twoColumn,
  item,
  contentSection,
  questionAnswer,
  metaDescription,
  releaseDate,
  trackList,
  track,
];

/**
 * Define the singleton document types
 */
export const singletonTypes = new Set<string>([about.name, contact.name]);
