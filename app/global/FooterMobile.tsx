"use client";

import Link from "next/link";
import { useState } from "react";

import FollowPopover from "../../components/FollowPopover";

export default function FooterMobile({ offset }: { offset: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-1 text-oxe-xs uppercase lg:hidden">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="block self-start"
      >
        <span role="img" aria-hidden="true">
          {isExpanded ? "↑" : "↓"}
        </span>

        <span className="sr-only">{isExpanded ? "Close" : "Expand"}</span>
      </button>

      {isExpanded && (
        <>
          <Link href="/publishing">Publishing</Link>

          <FollowPopover offset={offset} />

          <Link href="/terms-and-conditions">Terms</Link>

          <Link href="/privacy-policy">Privacy</Link>

          <Link href="/faq">FAQ</Link>
        </>
      )}
    </div>
  );
}
