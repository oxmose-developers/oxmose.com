import { toPlainText } from "@portabletext/react";
import { useMediaQuery,useWindowSize } from "@uidotdev/usehooks";
import ReleasePageDesktop from "_old/components/pages/release/ReleasePageDesktop";
import ReleasePageMobile from "_old/components/pages/release/ReleasePageMobile";
import WindowSizeLayout from "_old/components/pages/release/WindowSizeLayout";
import { getHomePageTitle, getReleaseBySlug, getReleasePaths } from "_old/lib/sanity.fetch";
import { defineMetadata } from "_old/lib/utils.metadata";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { ReleasePayload } from "_old/types";

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

export default async function ReleaseSlugRoute({ params }: Props) {
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
      <>
        <WindowSizeLayout data={data}/>
      </>
      
    // </LiveQuery>
  )
}