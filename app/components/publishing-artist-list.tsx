import { fetchPublishingArtists } from "../../lib/sanity/queries";
import PublishingArtistRow from "./publishing-artist-row";

export default async function PublishingArtistsList() {
  const publishingArtists = await fetchPublishingArtists();

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
