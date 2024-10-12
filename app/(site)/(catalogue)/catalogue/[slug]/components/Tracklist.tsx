import Link from "next/link";
import { Fragment } from "react";

import type { Track, TrackList } from "../../../../../../groq";
import { urlForFile } from "../../../../../../lib/sanity/file";
import Player from "../../../../../global/Player";
import ClientOnly from "../../../../../shared/client-only";

export default function Tracklist({
  tracks,
  album,
  artwork,
}: {
  tracks: TrackList;
  album: string;
  artwork: string;
}) {
  return (
    <>
      <ClientOnly>
        <Player
          album={album}
          artwork={artwork}
          tracks={tracks.tracks.map(
            (el) =>
              ({ ...el, url: urlForFile(el.file) }) satisfies Track & {
                url: string | undefined;
              },
          )}
        />
      </ClientOnly>

      <table className="w-full text-left text-oxe-xs font-medium lg:text-oxe-sm/[32px]">
        <thead>
          <tr>
            <td className="bg-black pb-1 pt-1.5 uppercase text-white first:pl-10 last:pr-10 lg:py-2">
              #
            </td>

            <td className="bg-black pb-1 pt-1.5 uppercase text-white first:pl-10 last:pr-10 lg:py-2">
              Title
            </td>

            <td className="hidden bg-black pb-1 pt-1.5 uppercase text-white first:pl-10 last:pr-10 lg:table-cell lg:py-2">
              Artist
            </td>

            <td className="bg-black pb-1 pt-1.5 uppercase text-white first:pl-10 last:pr-10 lg:py-2">
              Time
            </td>
          </tr>
        </thead>

        <tbody>
          {tracks.tracks.map((track) => (
            <tr key={track._key} className="group">
              <td className="px-0 py-0.5 pr-5 first:pl-10 last:pr-10 group-hover:bg-black group-hover:text-white lg:w-12">
                <span className="tabular-nums">
                  {`${track.number}`.padStart(2, "0")}
                </span>
              </td>

              <td className="px-0 py-0.5 pr-5 first:pl-10 last:pr-10 group-hover:bg-black group-hover:text-white lg:w-1/2">
                <a href={urlForFile(track.file)}>{track.name}</a>
              </td>

              <td className="hidden px-0 py-0.5 pr-5 uppercase first:pl-10 last:pr-10 group-hover:bg-black group-hover:text-white lg:table-cell lg:w-1/2">
                {track.artists.map((artist, idx, artists) => (
                  <Fragment key={artist.slug.current}>
                    <Link href={`/artists/${artist.slug.current}`}>
                      {artist.name}
                    </Link>

                    {idx !== artists.length - 1 && <span>{", "}</span>}
                  </Fragment>
                ))}
              </td>

              <td className="px-0 py-0.5 pr-5 first:pl-10 last:pr-10 group-hover:bg-black group-hover:text-white lg:w-24">
                <span className="whitespace-nowrap tabular-nums">
                  {track.length}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
