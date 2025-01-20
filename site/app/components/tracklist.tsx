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
    <table className="w-full text-left text-oxe-xxs font-medium md:text-oxe-sm/8">
      <thead>
        <tr>
          <td className="bg-black pb-1 pt-1.5 uppercase text-white first:pl-9 last:pr-5 dark:bg-white dark:text-black md:py-2 md:first:pl-10 md:last:pr-10">
            #
          </td>

          <td className="bg-black pb-1 pt-1.5 uppercase text-white first:pl-9 last:pr-5 dark:bg-white dark:text-black md:py-2 md:first:pl-10 md:last:pr-10">
            Title
          </td>

          <td className="hidden bg-black pb-1 pt-1.5 uppercase text-white first:pl-9 last:pr-5 dark:bg-white dark:text-black md:table-cell md:py-2 md:first:pl-10 md:last:pr-10">
            {`Artist(s)`}
          </td>

          <td className="bg-black pb-1 pt-1.5 uppercase text-white first:pl-9 last:pr-5 dark:bg-white dark:text-black md:py-2 md:first:pl-10 md:last:pr-10">
            Time
          </td>
        </tr>
      </thead>

      <tbody>
        {tracks.tracks.map((track, idx) => (
          <tr key={track._key} className="group relative">
            <td className="px-0 py-0.5 pr-2 first:pl-9 last:pr-5 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black md:w-12 md:pr-5 md:first:pl-10 md:last:pr-10">
              <span className="tabular-nums">
                {`${track.number}`.padStart(2, "0")}
              </span>
            </td>

            <td className="relative px-0 py-0.5 first:pl-9 last:pr-5 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black md:w-1/2 md:pr-5 md:first:pl-10 md:last:pr-10">
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

            <td className="hidden px-0 py-0.5 uppercase first:pl-9 last:pr-5 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black md:table-cell md:w-1/2 md:pr-5 md:first:pl-10 md:last:pr-10">
              {artistName ??
                track.artists.map((artist, idx, artists) => (
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

            <td className="px-0 py-0.5 pr-5 first:pl-9 last:pr-5 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black md:w-24 md:first:pl-10 md:last:pr-10">
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
