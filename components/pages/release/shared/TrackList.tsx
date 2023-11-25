import { Track } from "types";

export default function trackList({ trackList }: { trackList: Track[] }) {
  return (
    <>
      <h3 className="mx-7 mb-3 font-semibold text-xl uppercase">TRACKLIST</h3>

      <table className="w-full font-semibold table-fixed text-left">
        <thead className="bg-black text-white uppercase text-lg">
          <tr>
            <th className="pl-7">#</th>
            <th className="w-[55%]">TITLE</th>
            <th className="pr-7 text-right">TIME</th>
          </tr>
        </thead>
        <tbody className="mt-3 py-2 px-4 text-lg before:h-3 before:block">
          {trackList?.map((track, index=1) => (
            <tr key={track._id}>
              <td className="pl-7">{index.toString().padStart(2, '0')}</td>
              <td>{track.title}</td>
              <td className="pr-7 text-right tracking-tight">{`${track.time.minutes} : ${track.time.seconds.padStart(2, '0')}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}