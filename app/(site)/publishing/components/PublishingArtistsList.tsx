import { PublishingArtistsQuery } from "../../../../groq";
import { client } from "../../../../lib/sanity";
import PublishingArtistRow from "./PublishingArtistRow";

export default async function PublishingArtistsList() {
  const publishingArtists = await client.fetch<PublishingArtistsQuery>(
    PublishingArtistsQuery,
    {},
    { next: { tags: ["publishingArtists"] } },
  );

  /**
   * Uses a fragment as there is a <ul> element where this Component is used
   */
  return (
    <>
      {publishingArtists.map((artist) => (
        <PublishingArtistRow key={artist._id} publishingArtist={artist} />
      ))}
    </>
  );
}
