import type { Metadata } from "next";

import ArtistRow from "./components/ArtistRow";
import { fetchArtists } from "./loader";

export const metadata: Metadata = {
  title: "Artists",
  openGraph: { title: "Artists" },
  twitter: { title: "Artists" },
};

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
