"use client";

import * as Progress from "@radix-ui/react-progress";
import Image from "next/image";
import { useMemo, useState } from "react";
import { hasAtLeast } from "remeda";

import { usePlayer, usePlayerActions } from "../../context/player-context";
import closeIcon from "../../images/close@3x.png";
import pauseIcon from "../../images/pause@3x.png";
import playIcon from "../../images/play@3x.png";
import playlistIcon from "../../images/playlist@3x.png";
import skipIcon from "../../images/skip@3x.png";

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
      <button
        className="flex size-[4.5rem] items-center justify-center"
        onClick={() => controls.previousTrack()}
      >
        <Image
          alt="Previous"
          height={40}
          loading="eager"
          priority
          src={skipIcon}
          width={40}
        />
      </button>

      <button
        className="flex size-[4.5rem] items-center justify-center"
        onClick={() => (state.isPlaying ? controls.pause() : controls.play())}
      >
        <Image
          alt="Pause"
          height={40}
          loading="eager"
          priority
          src={pauseIcon}
          width={40}
          className="hidden data-[playing=true]:block"
          data-playing={state.isPlaying}
        />

        <Image
          alt="Play"
          height={40}
          loading="eager"
          priority
          src={playIcon}
          width={40}
          className="hidden data-[playing=false]:block"
          data-playing={state.isPlaying}
        />
      </button>

      <button
        className="flex size-[4.5rem] items-center justify-center"
        onClick={() => controls.nextTrack()}
      >
        <Image
          alt="Next"
          height={40}
          loading="eager"
          priority
          src={skipIcon}
          className="rotate-180"
          width={40}
        />
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
    <div className="relative flex flex-1 items-center justify-between overflow-x-hidden px-5 text-[1.375rem] uppercase">
      <p className="whitespace-nowrap">{nowPlaying}</p>

      <p className="whitespace-nowrap tabular-nums text-oxe-grey">
        {formatDuration(state.duration)}
      </p>

      <Progress.Root
        className="absolute bottom-0 left-0 right-0 z-0 h-1.5 w-full overflow-hidden bg-white"
        style={{
          // Fix overflow clipping in Safari
          // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
          transform: "translateZ(0)",
        }}
        value={state.progress * 100}
      >
        <Progress.Indicator
          className="size-full bg-oxe-purple transition-transform ease-linear"
          style={{ transform: `translateX(-${100 - state.progress * 100}%)` }}
        />
      </Progress.Root>
    </div>
  );
}

function PlayerPlaylist() {
  const { state } = usePlayer();

  const playerActions = usePlayerActions();

  return (
    <div className="max-h-[calc(100svh/2)] overflow-y-scroll border-t-hairline border-white/40 bg-black text-white">
      <div className="grid divide-y-hairline divide-white/40">
        <div className="relative grid grid-cols-2 gap-x-5 px-5 py-1.5 text-[1.375rem] lg:grid-cols-3">
          <div className="hidden uppercase lg:block">Track</div>
          <div className="uppercase">Title</div>
          <div className="place-self-end uppercase lg:place-self-start">
            Artist
          </div>
        </div>

        {state.playlist.map((track, index) => (
          <div
            key={track.title}
            className="relative grid grid-cols-2 gap-x-5 px-5 py-1.5 text-[1.375rem] hover:bg-white hover:text-black lg:grid-cols-3"
          >
            <div className="hidden uppercase lg:block">
              <p className="tabular-nums">{`${index + 1}`.padStart(2, "0")}</p>
            </div>

            <div className="">{track.title}</div>

            <div className="place-self-end lg:place-self-start">
              {track.artist}
            </div>

            <button
              className="absolute inset-0 z-[1] block"
              onClick={() => {
                playerActions.play(index);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Player() {
  const { state } = usePlayer();

  const [isPlayerOpen, isPlayerOpenSet] = useState(true);
  const [isPlaylistOpen, isPlaylistOpenSet] = useState(false);

  if (hasAtLeast(state.playlist, 1)) {
    if (isPlayerOpen) {
      return (
        <div className="fixed inset-x-0 bottom-0 z-40">
          {isPlaylistOpen && <PlayerPlaylist />}

          <div className="flex h-[4.5rem] items-stretch divide-x-hairline divide-white/40 border-t-hairline border-white/40 bg-black text-white">
            <PlayerControls />

            <PlayerNowPlaying />

            <button
              onClick={() => isPlaylistOpenSet(!isPlaylistOpen)}
              className="flex size-[4.5rem] items-center justify-center"
            >
              <Image
                className="data-[playlist-open=true]:opacity-50"
                alt="Open Playlist"
                height={40}
                loading="eager"
                priority
                src={playlistIcon}
                data-playlist-open={isPlaylistOpen}
                width={40}
              />
            </button>

            <button
              onClick={() => isPlayerOpenSet(false)}
              className="flex size-[4.5rem] items-center justify-center"
            >
              <Image
                alt="Close Player"
                height={40}
                loading="eager"
                priority
                src={closeIcon}
                width={40}
              />
            </button>
          </div>
        </div>
      );
    }

    return (
      <button
        onClick={() => isPlayerOpenSet(true)}
        className="fixed bottom-0 right-0 z-40 flex size-[4.5rem] items-center justify-center border-hairline border-b-0 border-r-0 border-white/40 bg-black text-white"
      >
        <Image
          alt="Play"
          height={40}
          loading="eager"
          priority
          src={playIcon}
          width={40}
        />
      </button>
    );
  }

  return null;
}
