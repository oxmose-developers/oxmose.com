import { notFound } from "next/navigation";

import {
  PublishingArtistPageQuery,
  PublishingArtistsStaticParamsQuery,
} from "../../../../groq";
import { client, urlForImage } from "../../../../lib/sanity";

export async function generateStaticParams() {
  const publishingArtists =
    await client.fetch<PublishingArtistsStaticParamsQuery>(
      PublishingArtistsStaticParamsQuery,
      {},
      { next: { tags: ["publishingArtistsStaticParams"] } },
    );

  return publishingArtists.map((artist) => {
    return {
      params: { slug: artist.slug.current },
    };
  });
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const publishingArtist = await client.fetch<PublishingArtistPageQuery>(
    PublishingArtistPageQuery,
    { slug },
    { next: { tags: [slug] } },
  );

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
