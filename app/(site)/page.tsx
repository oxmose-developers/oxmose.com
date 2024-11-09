import type { Metadata } from "next";

import { fetchReleases } from "../../lib/sanity/queries";
import styles from "../shared/catalogue.module.css";
import CatalogueCard from "../shared/CatalogueCard";

export const metadata: Metadata = {
  title: "Catalogue",
  openGraph: { title: "Catalogue" },
  twitter: { title: "Catalogue" },
};

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
