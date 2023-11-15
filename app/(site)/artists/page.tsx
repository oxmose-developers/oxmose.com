import { getArtistList } from "lib/sanity.fetch";
import { resolveHref } from "lib/sanity.links";
import Link from "next/link";


export default async function ArtistPage() {
  const artists = await getArtistList();
  return (
    <div>
      {
        artists && artists.map((artist) => {
          const href = resolveHref(artist._type, artist.slug);
          if (!href) {
            return null;
          }
          return (
            <Link 
              key={artist._id} 
              href={href} 
              className="border-b border-t py-3 px-5 w-full block text-5xl font-medium tracking-tight"
            >
              {artist.name}
            </Link>
          )
        })
      }
    </div>
  )
}
