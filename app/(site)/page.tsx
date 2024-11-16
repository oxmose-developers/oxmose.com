import type { Metadata, ResolvingMetadata } from "next";

import { fetchReleases } from "../../lib/sanity/queries";
import styles from "../shared/catalogue.module.css";
import CatalogueCard from "../components/CatalogueCard";

export async function generateMetadata(
  props: { params: {} },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const existingMetadata = (await parent) as unknown as Metadata;

  return {
    title: "Catalogue",
    openGraph: {
      ...existingMetadata.openGraph,
      title: "Catalogue",
    },
    twitter: {
      ...existingMetadata.twitter,
      title: "Catalogue",
    },
  };
}

export default async function Page() {
  const releases = await fetchReleases();

  const hasOddReleases = (releases.length & 1) === 1;

  return (
    <>
      <h1 hidden>Oxmose | Catalogue</h1>

      <div className={styles.releases}>
        {releases.map((release) => (
          <CatalogueCard
            key={release._id}
            release={release}
            className={styles.release}
          />
        ))}

        {hasOddReleases && <div className={styles.release} />}
      </div>
    </>
  );
}
