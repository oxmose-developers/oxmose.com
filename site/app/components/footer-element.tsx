"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";

import FollowPopover from "./footer-follow-popover";
import NewsletterPopover from "./footer-newsletter-popover";

export default function Footer({ fullYear }: { fullYear: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const [ref, { height }] = useMeasure();

  useEffect(() => {
    if (isExpanded) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [isExpanded]);

  return (
    <footer ref={ref} className="relative shrink-0 bg-black text-white">
      <nav className="flex min-h-14 px-9 py-[calc((3.5rem-1.5625rem)/2)] pr-20 md:min-h-18 md:items-center md:py-[calc((4.5rem-2.125rem)/2)] md:pl-10 md:pr-24">
        <div className="flex flex-col gap-1 md:hidden">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="block self-start"
          >
            <span role="img" aria-hidden="true">
              {isExpanded ? "↓" : "↑"}
            </span>

            <span className="sr-only">{isExpanded ? "Close" : "Expand"}</span>
          </button>

          {isExpanded && (
            <>
              <Link className="text-oxe-xxs uppercase" href="/publishing">
                Publishing
              </Link>

              <FollowPopover offset={height} />

              <NewsletterPopover offset={height} />

              <Link
                className="text-oxe-xxs uppercase"
                href="/terms-and-conditions"
              >
                Terms
              </Link>

              <Link className="text-oxe-xxs uppercase" href="/privacy-policy">
                Privacy
              </Link>

              <Link className="text-oxe-xxs uppercase" href="/faq">
                FAQ
              </Link>
            </>
          )}
        </div>

        <div className="hidden gap-10 md:flex">
          <Link className="text-oxe-sm uppercase" href="/publishing">
            Publishing
          </Link>

          <FollowPopover offset={height} />

          <NewsletterPopover offset={height} />

          <Link className="text-oxe-sm uppercase" href="/terms-and-conditions">
            Terms
          </Link>

          <Link className="text-oxe-sm uppercase" href="/privacy-policy">
            Privacy
          </Link>

          <Link className="text-oxe-sm uppercase" href="/faq">
            FAQ
          </Link>
        </div>

        <p className="ml-auto whitespace-nowrap text-oxe-xxs uppercase md:text-oxe-sm">
          {`© ${fullYear} Oxmose`}
        </p>
      </nav>
    </footer>
  );
}
