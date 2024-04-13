import { ReleasesQuery } from "../../../groq";
import { client } from "../../../lib/sanity";
import CatalogueCard from "./components/CatalogueCard";

export default async function Page() {
  const releases = await client.fetch<ReleasesQuery>(ReleasesQuery);

  return (
    <>
      <h1 hidden>Oxmose</h1>

      <div className="divide-y divide-black bg-black md:grid md:grid-cols-2 md:gap-px md:divide-y-0">
        {releases.map((release) => (
          <CatalogueCard key={release._id} release={release} />
        ))}
      </div>
    </>
  );
}
