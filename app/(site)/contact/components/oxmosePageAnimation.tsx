"use client";

// Unneeded as its imported in the Navbar
// import "@aarsteinmedia/dotlottie-player-light";

import { type DotLottiePlayer } from "@aarsteinmedia/dotlottie-player-light";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "usehooks-ts";

export default function OxmosePageAnimation() {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.8,
  });

  const animation = useRef<DotLottiePlayer | null>(null);

  useEffect(() => {
    if (isIntersecting) {
      animation?.current?.play?.();
    }
  }, [animation, isIntersecting]);

  return (
    <div ref={ref} className="relative size-32 lg:size-48">
      <dotlottie-player
        ref={animation}
        class="invert"
        src="/V04_contact_page.lottie"
        subframe=""
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
