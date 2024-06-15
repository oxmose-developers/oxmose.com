import styles from "./catalogue.module.css";
import CatalogueCard from "./components/CatalogueCard";
import { fetchReleases } from "./loader";

export const dynamic = "force-static";

export default async function Page() {
  const releases = await fetchReleases();

  const hasOddReleases = (releases.length & 1) === 1;

  return (
    <>
      <h1 hidden>Oxmose</h1>

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
