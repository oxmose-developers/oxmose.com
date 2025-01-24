"use client";

import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";

const Player = dynamic(() => import("./player-element"), {
  ssr: false,
});

export default function PlayerLoader() {
  return (
    <ErrorBoundary fallback={null}>
      <Player />
    </ErrorBoundary>
  );
}
