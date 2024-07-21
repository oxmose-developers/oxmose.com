"use client";

// Unneeded as its imported in the Navbar
// import "@aarsteinmedia/dotlottie-player-light";

import { type DotLottiePlayer } from "@aarsteinmedia/dotlottie-player-light";
import { useEffect, useRef } from "react";

export default function OxmosePageAnimation() {
  const animation = useRef<DotLottiePlayer | null>(null);

  useEffect(() => {
    const ref = animation.current;

    if (ref) {
      ref.addEventListener("ready", () => ref.play());
    }

    return () => {
      if (ref) {
        ref.removeEventListener("ready", () => ref.play());
      }
    };
  }, [animation]);

  return (
    <dotlottie-player
      ref={animation}
      src="/oxmose-site-header-logo-cropped.lottie"
      autoplay=""
      subframe=""
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
