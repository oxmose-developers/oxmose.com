"use client";

import Link from "next/link";
import { useState } from "react";

import FollowPopover from "./FollowPopover";
import NewsletterPopover from "./NewsletterPopover";

export default function FooterMobile({ offset }: { offset: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-1 lg:hidden">
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
          <Link className="text-oxe-xs uppercase" href="/publishing">
            Publishing
          </Link>

          <FollowPopover offset={offset} />

          <NewsletterPopover offset={offset} />

          <Link className="text-oxe-xs uppercase" href="/terms-and-conditions">
            Terms
          </Link>

          <Link className="text-oxe-xs uppercase" href="/privacy-policy">
            Privacy
          </Link>

          <Link className="text-oxe-xs uppercase" href="/faq">
            FAQ
          </Link>
        </>
      )}
    </div>
  );
}
