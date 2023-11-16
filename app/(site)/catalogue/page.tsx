/**
 * - Blocks layout
 * - Photographs of albums/EPs with titles
 * - 1 link for each redirecting to a product page (release) - 1 link for each to play music via audio player
 */

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
            <div key={release._id}>
              <Link 
                href={href}
                className="border mt-[-1px] grid grid-cols-[3fr_5fr] gap-4 grid-rows-[2fr_5fr] py-2 px-3" 
              >
                  <h2 className="col-start-1 col-span-1 text-5xl font-semibold uppercase">{release.artist.name}</h2>
                  <h3 className="row-start-2 col-span-1 text-xl font-medium mt-auto">{release.title}</h3>
                  <ImageBox
                    image={release.coverImage}
                    imagePlaceholder={release.coverImage?.lqip}
                    alt={`Cover image for ${release.title}`}
                    height={400}
                    width={400}
                    classesWrapper="row-start-2 aspect-square object-cover"
                  />
              </Link>
            </div>
        )})
      }
    </div>
  )
}