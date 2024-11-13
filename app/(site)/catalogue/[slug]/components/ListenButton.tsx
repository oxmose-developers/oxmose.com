"use client";

import type { TrackList } from "../../../../../groq";
import {
  tracksToPlaylist,
  usePlayerActions,
} from "../../../../context/player-context";

export default function ListenButton({
  tracks: trackList,
  album,
  artwork,
}: {
  tracks: TrackList;
  album: string;
  artwork: string;
}) {
  const playerActions = usePlayerActions();

  return (
    <button
      onClick={() => {
        playerActions.loadPlaylist(
          tracksToPlaylist(trackList.tracks, artwork, album),
        );

        playerActions.play(0);
      }}
      className="text-oxe-sm font-medium uppercase"
    >
      Listen
    </button>
  );
}
