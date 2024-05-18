import { notFound } from "next/navigation";

import { urlForImage } from "../../../../lib/sanity";
import {
  fetchPublishingArtistPage,
  fetchPublishingArtistsStaticParams,
} from "../loader";

export async function generateStaticParams() {
  const publishingArtists = await fetchPublishingArtistsStaticParams();

  return publishingArtists.map((artist) => {
    return {
      params: { slug: artist.slug.current },
    };
  });
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const publishingArtist = await fetchPublishingArtistPage({ slug: slug });

  if (!publishingArtist) {
    return notFound();
  }

  const url = urlForImage(publishingArtist.coverImage).url();

  const webpUrl = urlForImage(publishingArtist.coverImage).format("webp").url();

  return (
    <div>
      <p>{slug}</p>

      <p>{publishingArtist.name}</p>
    </div>
  );
}
