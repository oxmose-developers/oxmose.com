

import { toPlainText } from "@portabletext/react";
import ReleasePage from "components/pages/release/ReleasePage";
import { getHomePageTitle, getReleaseBySlug, getReleasePaths } from "lib/sanity.fetch";
import { defineMetadata } from "lib/utils.metadata";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  const [homePageTitle, release] = await Promise.all([
    getHomePageTitle(),
    getReleaseBySlug(slug),
  ]);

  return defineMetadata({
    baseTitle: homePageTitle ?? undefined,
    description: release?.overview ? toPlainText(release.overview) : "",
    image: release?.coverImage,
    title: release?.title,
  });
}

export async function generateStaticParams() {
  const slugs = await getReleasePaths();
  return slugs.map((slug) => ({ slug }));
}

export default async function ReleaseSlugRoute({params}: Props) {
  const data = await getReleaseBySlug(params.slug)
  
  if (!data && !draftMode().isEnabled) {
    notFound();
  }

  return (
    // <LiveQuery
    //   enabled={draftMode().isEnabled}
    //   query={realeaseBySlugQuery}
    //   params={params}
    //   initialData={data}
    //   as={ArtistPreview}
    // >
      <ReleasePage data={data} />
    // </LiveQuery>
  )
}