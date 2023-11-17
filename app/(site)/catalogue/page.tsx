/**
 * - Blocks layout
 * - Photographs of albums/EPs with titles
 * - 1 link for each redirecting to a product page (release) - 1 link for each to play music via audio player
 */

import ReleaseCard from "components/pages/catalogue/ReleaseCard";
import ImageBox from "components/shared/ImageBox"
import { getReleaseList } from "lib/sanity.fetch"
import { resolveHref } from "lib/sanity.links";
import Link from "next/link";

export default async function CataloguePage() {
  const releases = await getReleaseList()
  return (
    <div className="grid md:grid-cols-2">
      {
        releases && releases.map((release) => {
          const href = resolveHref(release._type, release.slug);
          if (!href) {
            return null;
          }
          return (
            <ReleaseCard key={release._id} data={{release, href}}  />
        )})
      }
    </div>
  )
}