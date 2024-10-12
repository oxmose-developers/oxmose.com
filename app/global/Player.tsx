"use client";

import * as Progress from "@radix-ui/react-progress";
import { useMemo, useState } from "react";
import { hasAtLeast } from "remeda";

import { usePlayer, usePlayerActions } from "../context/player-context";

function formatDuration(durationInSeconds: number): string {
  if (isNaN(durationInSeconds) || durationInSeconds === Infinity) return "0:00";

  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  } else {
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
}

function PlayerControls() {
  const { state } = usePlayer();

  const controls = usePlayerActions();

  return (
    <>
      <button className="px-5" onClick={() => controls.previousTrack()}>
        Previous
      </button>

      <button
        className="px-5"
        onClick={() => (state.isPlaying ? controls.pause() : controls.play())}
      >
        {state.isPlaying ? "Pause" : "Play"}
      </button>

      <button className="px-5" onClick={() => controls.nextTrack()}>
        Next
      </button>
    </>
  );
}

function PlayerNowPlaying() {
  const { state } = usePlayer();

  const nowPlaying = useMemo(() => {
    const currentTrack = state.playlist?.[state.currentTrackIndex];
    if (!currentTrack) return undefined;
    return `${currentTrack.artist} • ${currentTrack.title}`;
  }, [state.playlist, state.currentTrackIndex]);

  return (
    <div className="relative flex flex-1 items-center justify-between px-5">
      <p className="whitespace-nowrap">{nowPlaying}</p>

      <p className="text-oxe-grey whitespace-nowrap tabular-nums">
        {formatDuration(state.duration)}
      </p>

      <Progress.Root
        className="absolute bottom-0 left-0 right-0 h-1.5 w-full overflow-hidden bg-white"
        style={{
          // Fix overflow clipping in Safari
          // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
          transform: "translateZ(0)",
        }}
        value={state.progress * 100}
      >
        <Progress.Indicator
          className="bg-oxe-purple size-full transition-transform ease-linear"
          style={{ transform: `translateX(-${100 - state.progress * 100}%)` }}
        />
      </Progress.Root>
    </div>
  );
}

export default function Player() {
  const { state } = usePlayer();

  const [isOpen, isOpenSet] = useState(false);

  if (hasAtLeast(state.playlist, 1)) {
    if (isOpen) {
      return (
        <div className="divide-x-hairline border-t-hairline fixed inset-x-0 bottom-0 z-50 flex h-[3.75rem] items-stretch divide-white/40 border-white/40 bg-black text-[22px] uppercase text-white">
          <PlayerControls />

          <PlayerNowPlaying />

          <button onClick={() => {}} className="px-5">
            Show Playlist
          </button>

          <button onClick={() => isOpenSet(false)} className="px-5">
            Close
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={() => isOpenSet(true)}
        className="fixed bottom-0 right-0 size-[3.75rem] bg-black text-white"
      >
        Open
      </button>
    );
  }

  return null;
}
