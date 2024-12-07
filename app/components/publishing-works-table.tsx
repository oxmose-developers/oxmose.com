import type { TrackList } from "../../lib/sanity";

export default function WorksTable({
  works,
  name,
}: {
  works: TrackList;
  name: string;
}) {
  return (
    <table className="w-full text-left text-oxe-xs font-medium lg:text-oxe-sm/[2rem]">
      <thead>
        <tr>
          <td className="bg-white pb-1 pt-1.5 uppercase text-black first:pl-10 last:pr-10 lg:py-2">
            <span className="hidden lg:inline">&nbsp;</span>
            <span className="inline lg:hidden">#</span>
          </td>

          <td className="bg-white pb-1 pt-1.5 uppercase text-black first:pl-10 last:pr-10 lg:py-2">
            Title
          </td>

          <td className="hidden bg-white pb-1 pt-1.5 uppercase text-black first:pl-10 last:pr-10 lg:table-cell lg:py-2">
            Artist
          </td>

          <td className="bg-white pb-1 pt-1.5 uppercase text-black first:pl-10 last:pr-10 lg:py-2">
            Time
          </td>
        </tr>
      </thead>

      <tbody>
        {works.tracks.map((track) => (
          <tr key={track._key}>
            <td className="px-0 py-0.5 pr-5 first:pl-10 last:pr-10">
              {`${track.number}`.padStart(2, "0")}
            </td>

            <td className="px-0 py-0.5 pr-5 first:pl-10 last:pr-10">
              {track.name}
            </td>

            <td className="hidden px-0 py-0.5 pr-5 uppercase first:pl-10 last:pr-10 lg:table-cell">
              {name}
            </td>

            <td className="px-0 py-0.5 pr-5 first:pl-10 last:pr-10">
              <span className="whitespace-nowrap">{track.length}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
