import { ReleasesQuery } from "../../../groq";
import { client } from "../../../lib/sanity";
import styles from "./catalogue.module.css";
import CatalogueCard from "./components/CatalogueCard";

export default async function Page() {
  const releases = await client.fetch<ReleasesQuery>(
    ReleasesQuery,
    {},
    { next: { tags: ["releases"] } },
  );

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
