

import ArtistListItem from "components/pages/artist/ArtistListItem";
import { getArtistList } from "lib/sanity.fetch";
import { resolveHref } from "lib/sanity.links";

export default async function ArtistPage() {
  const artists = await getArtistList();

  return (
    <div className="relative">
      {
        artists && artists.map((artist) => {
          const href = resolveHref(artist._type, artist.slug);
          if (!href) {
            return null;
          }
          return (
            <ArtistListItem key={artist._id} artist={artist} href={href} />
          )
        })
      }
    </div>
  )
}
