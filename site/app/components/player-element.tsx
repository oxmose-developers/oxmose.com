"use client";

import * as Progress from "@radix-ui/react-progress";
import Image from "next/image";
import { useRef, useState } from "react";
import { hasAtLeast } from "remeda";
import { useOnClickOutside } from "usehooks-ts";

import {
  type Track,
  usePlayer,
  usePlayerActions,
} from "../../context/player-context";
import closeIcon from "../../images/close.svg";
import pauseIcon from "../../images/pause.svg";
import playIcon from "../../images/play.svg";
import playlistIcon from "../../images/playlist.svg";
import skipIcon from "../../images/skip.svg";

function formatDuration(durationInSeconds: number): string {
  if (Number.isNaN(durationInSeconds) || durationInSeconds === Infinity)
    return "0:00";

  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  return hours > 0
    ? `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    : `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function PlayerControls() {
  const { state } = usePlayer();

  const controls = usePlayerActions();

  return (
    <>
      <button
        className="hidden size-14 items-center justify-center sm:flex md:size-18"
        onClick={() => controls.previousTrack()}
      >
        <Image
          className="size-8 md:size-10"
          alt="Previous"
          height={40}
          loading="eager"
          priority
          src={skipIcon}
          width={40}
        />
      </button>

      <button
        className="flex size-14 items-center justify-center md:size-18"
        onClick={() => (state.isPlaying ? controls.pause() : controls.play())}
      >
        <Image
          alt="Pause"
          height={40}
          loading="eager"
          priority
          src={pauseIcon}
          width={40}
          className="hidden size-8 data-[playing=true]:block md:size-10"
          data-playing={state.isPlaying}
        />

        <Image
          alt="Play"
          height={40}
          loading="eager"
          priority
          src={playIcon}
          width={40}
          className="hidden size-8 data-[playing=false]:block md:size-10"
          data-playing={state.isPlaying}
        />
      </button>

      <button
        className="hidden size-14 items-center justify-center sm:flex md:size-18"
        onClick={() => controls.nextTrack()}
      >
        <Image
          alt="Next"
          height={40}
          loading="eager"
          priority
          src={skipIcon}
          className="size-8 rotate-180 md:size-10"
          width={40}
        />
      </button>
    </>
  );
}

function PlayerNowPlaying() {
  const { state } = usePlayer();

  const currentTrack: Track | undefined =
    state.playlist?.[state.currentTrackIndex];

  const nowPlaying = currentTrack
    ? `${currentTrack.artist} • ${currentTrack.title}`
    : undefined;

  const nowPlayingMobile = currentTrack
    ? `${currentTrack.title} • ${currentTrack.artist}`
    : undefined;

  return (
    <div className="relative flex flex-1 items-center justify-between gap-4 overflow-x-hidden px-5 text-oxe-xxs uppercase leading-[inherit] md:text-oxe-xs">
      <p className="truncate whitespace-nowrap">
        <span className="inline sm:hidden">{nowPlayingMobile}</span>
        <span className="hidden sm:inline">{nowPlaying}</span>
      </p>

      <p className="hidden whitespace-nowrap tabular-nums text-oxe-grey sm:block">
        {`${formatDuration(state.currentTime)} / ${formatDuration(state.duration)}`}
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
        <div className="relative grid grid-cols-3 gap-x-5 px-5 py-1.5 text-oxe-xxs leading-[inherit] text-oxe-grey md:grid-cols-4 md:text-oxe-xs">
          <div className="hidden uppercase md:block">#</div>
          <div className="uppercase">Title</div>
          <div className="uppercase">{`Artist(s)`}</div>
          <div className="place-self-end uppercase md:place-self-start">
            Time
          </div>
        </div>

        {state.playlist.map((track, index) => (
          <div
            key={track.title}
            className="relative grid grid-cols-3 gap-x-5 px-5 py-1.5 text-oxe-xxs leading-[inherit] hover:bg-white hover:text-black data-[current-track=true]:bg-oxe-purple data-[current-track=true]:text-black md:grid-cols-4 md:text-oxe-xs"
            data-current-track={state.currentTrackIndex === index}
          >
            <div className="hidden uppercase md:block">
              <p className="tabular-nums">{`${index + 1}`.padStart(2, "0")}</p>
            </div>

            <div className="truncate">{track.title}</div>

            <div className="truncate">{track.artist}</div>

            <div className="place-self-end md:place-self-start">
              {track.duration}
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

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(
    /* @ts-expect-error Ignore incorrect ref type */
    ref,
    () => isPlaylistOpenSet(false),
  );

  if (hasAtLeast(state.playlist, 1)) {
    if (isPlayerOpen) {
      return (
        <div
          className="fixed inset-x-0 bottom-[env(safe-area-inset-bottom)] z-40 after:absolute after:inset-x-0 after:h-[env(safe-area-inset-bottom)] after:border-t-hairline after:border-white/40 after:bg-black"
          ref={ref}
        >
          {isPlaylistOpen && <PlayerPlaylist />}

          <div className="flex h-14 items-stretch divide-x-hairline divide-white/40 border-t-hairline border-white/40 bg-black text-white md:h-18">
            <PlayerControls />

            <PlayerNowPlaying />

            <button
              onClick={() => isPlaylistOpenSet(!isPlaylistOpen)}
              className="flex size-14 items-center justify-center md:size-18"
            >
              <Image
                className="size-8 data-[playlist-open=true]:opacity-50 md:size-10"
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
              className="flex size-14 items-center justify-center md:size-18"
            >
              <Image
                className="size-8 md:size-10"
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
        className="fixed bottom-[env(safe-area-inset-bottom,0px)] right-0 z-40 flex size-14 items-center justify-center border-hairline border-b-0 border-r-0 border-white/40 bg-black text-white md:size-18"
      >
        <Image
          className="size-8 md:size-10"
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
