"use client";

import { useEffect, useState } from "react";

import type { Track } from "../../groq";

export default function Player({
  tracks,
  album,
  artwork,
}: {
  tracks: (Track & { url: string | undefined })[];
  album: string;
  artwork: string;
}) {
  const [isOpen, isOpenSet] = useState(false);
  const [playing, playingSet] = useState(false);

  const onPlayPauseClick = () => {
    if (playing) {
      playingSet(false);
      return;
    }

    playingSet(true);
  };

  useEffect(() => {
    if ("mediaSession" in navigator && playing) {
      navigator.mediaSession.metadata = new MediaMetadata({
        album: album,
        title: tracks[0].name,
        artist: tracks[0].artists.map((el) => el.name).join(", "),
        artwork: [{ src: artwork, sizes: "512x512", type: "image/jpeg" }],
      });
      navigator.mediaSession.playbackState = "playing";
    }
  }, [tracks, playing, album, artwork]);

  if (isOpen) {
    return (
      <div className="fixed inset-x-0 bottom-0 flex h-[3.75rem] w-full items-center gap-10 bg-black px-10 py-3 text-white">
        <div className="flex items-center gap-10">
          <button>Previous</button>

          <button onClick={onPlayPauseClick}>
            {playing ? <span>Pause</span> : <span>Play</span>}
          </button>

          <button>Next</button>
        </div>

        <div>
          <p>Hands - Oliver Doerell</p>
        </div>

        <div className="h-1 flex-1 rounded-full bg-white"></div>

        <button onClick={() => isOpenSet(false)} className="">
          <span className="sr-only">Close Player</span>
          <span role="img" aria-hidden="true">
            ❎
          </span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => isOpenSet(true)}
      className="fixed bottom-0 right-0 size-[3.75rem] bg-black text-white"
    >
      <span className="sr-only">Open Player</span>
      <span role="img" aria-hidden="true">
        ▶️
      </span>
    </button>
  );
}
