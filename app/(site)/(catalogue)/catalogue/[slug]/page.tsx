import { notFound } from "next/navigation";

import { fetchReleasePage, fetchReleasesStaticParams } from "../../loader";
import { AddToCartDigital, AddToCartVinyl } from "./components/AddToCart";

export async function generateStaticParams() {
  const releases = await fetchReleasesStaticParams();

  return releases.map((release) => {
    return {
      params: { slug: release.slug.current },
    };
  });
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const release = await fetchReleasePage({ slug });

  if (!release) {
    return notFound();
  }

  return (
    <div>
      <div>
        <AddToCartDigital />

        <AddToCartVinyl />
      </div>
    </div>
  );
}
