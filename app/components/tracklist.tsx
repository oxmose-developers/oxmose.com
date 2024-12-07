"use client";

import Link from "next/link";
import { Fragment } from "react";

import {
  tracksToPlaylist,
  usePlayerActions,
} from "../../context/player-context";
import type { TrackList } from "../../lib/sanity/groq";

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
    <table className="w-full text-left text-oxe-xs font-medium lg:text-oxe-sm/[2rem]">
      <thead>
        <tr>
          <td className="bg-black pb-1 pt-1.5 uppercase text-white first:pl-10 last:pr-10 dark:bg-white dark:text-black lg:py-2">
            #
          </td>

          <td className="bg-black pb-1 pt-1.5 uppercase text-white first:pl-10 last:pr-10 dark:bg-white dark:text-black lg:py-2">
            Title
          </td>

          <td className="hidden bg-black pb-1 pt-1.5 uppercase text-white first:pl-10 last:pr-10 dark:bg-white dark:text-black lg:table-cell lg:py-2">
            Artist
          </td>

          <td className="bg-black pb-1 pt-1.5 uppercase text-white first:pl-10 last:pr-10 dark:bg-white dark:text-black lg:py-2">
            Time
          </td>
        </tr>
      </thead>

      <tbody>
        {tracks.tracks.map((track, idx) => (
          <tr key={track._key} className="group">
            <td className="px-0 py-0.5 pr-5 first:pl-10 last:pr-10 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black lg:w-12">
              <span className="tabular-nums">
                {`${track.number}`.padStart(2, "0")}
              </span>
            </td>

            <td className="relative px-0 py-0.5 pr-5 first:pl-10 last:pr-10 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black lg:w-1/2">
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

            <td className="hidden px-0 py-0.5 pr-5 uppercase first:pl-10 last:pr-10 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black lg:table-cell lg:w-1/2">
              {artistName
                ? artistName
                : track.artists.map((artist, idx, artists) => (
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

            <td className="px-0 py-0.5 pr-5 first:pl-10 last:pr-10 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black lg:w-24">
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
