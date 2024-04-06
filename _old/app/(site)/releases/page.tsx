/**
 * - Blocks layout
 * - Photographs of albums/EPs with titles
 * - 1 link for each redirecting to a product page (release) - 1 link for each to play music via audio player
 */

import ReleaseCard from "_old/components/pages/release/ReleaseCard";
import { getReleaseList } from "_old/lib/sanity.fetch";
import { resolveHref } from "_old/lib/sanity.links";

export default async function CataloguePage() {
  const releases = await getReleaseList();
  return (
    <div className="mx-[-1px] grid md:grid-cols-2">
      {releases &&
        releases.map((release) => {
          const hrefRelease = resolveHref(release._type, release.slug);
          const hrefArtist = resolveHref(
            release.artist._type,
            release.artist.slug,
          );
          if (!hrefRelease) return null;
          if (!hrefArtist) return null;
          return (
            <ReleaseCard
              key={release._id}
              data={{ release, hrefRelease, hrefArtist }}
            />
          );
        })}
    </div>
  );
}
