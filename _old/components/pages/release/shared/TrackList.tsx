import { Track } from "_old/types";

export default function trackList({ trackList, artist }: { trackList: Track[], artist?: string }) {
  return (
    <>
      {/* <h3 className="mx-7 mb-3 font-semibold text-xl uppercase">TRACKLIST</h3> */}

      <table className="w-full font-semibold table-fixed text-left">
        <thead className="bg-black text-white uppercase text-lg">
          <tr>
            <th className="pl-7 md:w-[7%]">#</th>
            <th className="w-[55%] md:w-[45%]">TITLE</th>
            {artist && <th className="hidden md:block md:w-[40%]">ARTIST</th>}
            <th className="pr-7 text-right">TIME</th>
          </tr>
        </thead>
        <tbody className="py-1 px-4 text-base md:text-lg before:h-3 before:block after:h-3 after:block">
          {trackList?.map((track, index=1) => (
            <tr key={track._id}>
              <td className="pl-7">{(index +1).toString().padStart(2, '0')}</td>
              <td>{track.title}</td>
              {artist && <td className="hidden md:block">{artist}</td>}
              <td className="pr-7 text-right tracking-tight">{`${track.time.minutes} : ${track.time.seconds.padStart(2, '0')}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}