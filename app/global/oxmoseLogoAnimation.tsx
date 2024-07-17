"use client";

import "@aarsteinmedia/dotlottie-player-light";

import type { DotLottiePlayer } from "@aarsteinmedia/dotlottie-player-light";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function OxmoseLogoAnimation() {
  const animation = useRef<DotLottiePlayer | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    if (animation.current) {
      animation.current.seek(0);
      animation.current.play();
    }
  }, [pathname]);

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
