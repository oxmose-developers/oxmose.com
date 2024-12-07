import type { Metadata, ResolvingMetadata } from "next";

import { fetchArtists } from "../../../lib/sanity";
import ArtistRow from "../../components/artist-row";

export async function generateMetadata(
  props: { params: {} },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const existingMetadata = (await parent) as unknown as Metadata;

  return {
    title: "Artists",
    openGraph: {
      ...existingMetadata.openGraph,
      title: "Artists",
    },
    twitter: {
      ...existingMetadata.twitter,
      title: "Artists",
    },
  };
}

export default async function Page() {
  const artists = await fetchArtists();

  return (
    <>
      <h1 hidden>Artists | Oxmose</h1>

      <ul className="divide-y divide-black">
        {artists.map((artist) => (
          <ArtistRow key={artist._id} artist={artist} />
        ))}
      </ul>
    </>
  );
}
