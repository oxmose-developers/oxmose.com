import { ArtistsQuery } from "../../../groq";
import { client } from "../../../lib/sanity";
import ArtistRow from "./components/ArtistRow";

export default async function Page() {
  const artists = await client.fetch<ArtistsQuery>(ArtistsQuery);

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
