"use client";

import "@aarsteinmedia/dotlottie-player-light";

import type DotLottiePlayer from "@aarsteinmedia/dotlottie-player-light";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function OxmoseLogoAnimation() {
  const animation = useRef<DotLottiePlayer | null>(null);

  useEffect(() => {
    const ref = animation.current;

    if (ref) {
      /**
       * Hacky fix to prevent blurry animation on some browsers and OSs.
       */
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(`svg { transform: none !important; }`);
      ref.shadowRoot?.adoptedStyleSheets.push(sheet);

      ref.addEventListener("ready", () => ref.play());
    }

    return () => {
      if (ref) {
        ref.removeEventListener("ready", () => ref.play());
      }
    };
  }, [animation]);

  const pathname = usePathname();

  useEffect(() => {
    if (animation.current) {
      if (["/publishing"].includes(pathname)) {
        animation.current.seek(0);
        animation.current.play();
      }
    }
  }, [pathname]);

  return (
    // @ts-expect-error Ignore, this is typed properly.
    <dotlottie-player
      ref={animation}
      src="/V04_front_page_v01_192.lottie"
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
