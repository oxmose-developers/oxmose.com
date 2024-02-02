import { toPlainText } from "@portabletext/react";
import ArtistPage from "components/pages/artist/ArtistPage";
import ArtistPreview from "components/pages/artist/ArtistPreview";
import {
  getArtistBySlug,
  getArtistPaths,
  getHomePageTitle,
  getReleasesByArtist,
} from "lib/sanity.fetch";
import { artistBySlugQuery } from "lib/sanity.queries";
import { defineMetadata } from "lib/utils.metadata";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { LiveQuery } from "next-sanity/preview/live-query";
import { ReleasePayload } from "types";

export const runtime = "edge";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  const [homePageTitle, artist] = await Promise.all([
    getHomePageTitle(),
    getArtistBySlug(slug),
  ]);

  return defineMetadata({
    baseTitle: homePageTitle ?? undefined,
    description: artist?.overview ? toPlainText(artist.overview) : "",
    image: artist?.coverImage,
    title: artist?.name,
  });
}

export async function generateStaticParams() {
  const slugs = await getArtistPaths();
  return slugs.map((slug) => ({ slug }));
}

export default async function ArtistSlugRoute({ params }: Props) {
  const artist = await getArtistBySlug(params.slug);
  let releases: ReleasePayload[] | null = null;
  

  if (!artist && !draftMode().isEnabled) {
    notFound();
  } else if (artist && artist._id) {
    releases = await getReleasesByArtist(artist._id);
  }

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={artistBySlugQuery}
      params={params}
      initialData={artist}
      as={ArtistPreview}
    >
      <ArtistPage artist={artist} releases={releases}/>
    </LiveQuery>
  );
}
