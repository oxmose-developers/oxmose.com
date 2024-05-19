import { notFound } from "next/navigation";
import { Suspense } from "react";

import { fetchReleasePage, fetchReleasesStaticParams } from "../../loader";
import Product from "./components/Product";

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
        <Suspense>
          <Product type={"Digital"} handle={release.shopifyProductDigital} />
        </Suspense>

        <Suspense>
          <Product type={"Vinyl"} handle={release.shopifyProductPhysical} />
        </Suspense>
      </div>
    </div>
  );
}
