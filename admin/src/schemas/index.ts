import artist from "./artist";
import faqs from "./faqs";
import legal from "./legal";
import accessibleImage from "./objects/accessible-image";
import blockContent from "./objects/block-content";
import contentSection from "./objects/content-section";
import credits from "./objects/credits";
import item from "./objects/item";
import link from "./objects/link";
import metaDescription from "./objects/meta-description";
import questionAnswer from "./objects/question-answer";
import blockBreak from "./objects/block-break";
import releaseDate from "./objects/release-date";
import track from "./objects/track";
import trackList from "./objects/track-list";
import twoColumn from "./objects/two-column";
import publishingArtist from "./publishing-artist";
import release from "./release";
import about from "./singletons/about";
import contact from "./singletons/contact";
import publishing from "./singletons/publishing";
import seo from "./singletons/seo";

export const schemaTypes = [
  // singleton document types
  about,
  contact,
  publishing,
  seo,
  // regular document types
  artist,
  release,
  faqs,
  legal,
  publishingArtist,
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
  blockBreak,
];

/**
 * Define the singleton document types
 */
export const singletonTypes = new Set<string>([
  about.name,
  contact.name,
  publishing.name,
  seo.name,
]);
