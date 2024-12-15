"use client";

import Link from "next/link";
import { Fragment } from "react";

import {
  tracksToPlaylist,
  usePlayerActions,
} from "../../context/player-context";
import type { TrackList } from "../../lib/sanity";

export default function Tracklist({
  tracks,
  album,
  artwork,
  artistName,
}: {
  tracks: TrackList;
  album?: string;
  artwork?: string;
  artistName?: string;
}) {
  const playerActions = usePlayerActions();

  return (
    <table className="text-oxe-xxs w-full text-left font-medium md:text-oxe-sm/8">
      <thead>
        <tr>
          <td className="bg-black pb-1 pt-1.5 uppercase text-white first:pl-10 last:pr-10 dark:bg-white dark:text-black md:py-2">
            #
          </td>

          <td className="bg-black pb-1 pt-1.5 uppercase text-white first:pl-10 last:pr-10 dark:bg-white dark:text-black md:py-2">
            Title
          </td>

          <td className="hidden bg-black pb-1 pt-1.5 uppercase text-white first:pl-10 last:pr-10 dark:bg-white dark:text-black md:table-cell md:py-2">
            Artist
          </td>

          <td className="bg-black pb-1 pt-1.5 uppercase text-white first:pl-10 last:pr-10 dark:bg-white dark:text-black md:py-2">
            Time
          </td>
        </tr>
      </thead>

      <tbody>
        {tracks.tracks.map((track, idx) => (
          <tr key={track._key} className="group">
            <td className="px-0 py-0.5 pr-5 first:pl-10 last:pr-10 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black md:w-12">
              <span className="tabular-nums">
                {`${track.number}`.padStart(2, "0")}
              </span>
            </td>

            <td className="relative px-0 py-0.5 pr-5 first:pl-10 last:pr-10 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black md:w-1/2">
              <span>{track.name}</span>

              {track?.file && (
                <button
                  className="absolute inset-0 z-[1] block"
                  onClick={() => {
                    playerActions.loadPlaylist(
                      tracksToPlaylist(
                        tracks.tracks,
                        artwork,
                        album,
                        artistName,
                      ),
                    );

                    playerActions.play(idx);
                  }}
                />
              )}
            </td>

            <td className="hidden px-0 py-0.5 pr-5 uppercase first:pl-10 last:pr-10 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black md:table-cell md:w-1/2">
              {artistName
                ? artistName
                : track.artists.map((artist, idx, artists) => (
                    /* @ts-expect-error - This is a valid JSX element */
                    <Fragment key={artist.slug.current}>
                      <Link
                        className="relative z-[2]"
                        href={`/artists/${artist.slug.current}`}
                      >
                        {artist.name}
                      </Link>

                      {idx !== artists.length - 1 && <span>{", "}</span>}
                    </Fragment>
                  ))}
            </td>

            <td className="px-0 py-0.5 pr-5 first:pl-10 last:pr-10 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black md:w-24">
              <span className="whitespace-nowrap tabular-nums">
                {track.length}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
