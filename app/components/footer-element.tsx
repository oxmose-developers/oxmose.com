"use client";

import Link from "next/link";
import { useState } from "react";
import useMeasure from "react-use-measure";

import FollowPopover from "./footer-follow-popover";
import NewsletterPopover from "./footer-newsletter-popover";

export default function Footer({ fullYear }: { fullYear: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const [ref, { height }] = useMeasure();

  return (
    <footer
      ref={ref}
      className="relative shrink-0 bg-black py-2 text-white md:py-[1.2rem]"
    >
      <nav className="flex items-end px-9 md:items-center md:pl-10 md:pr-24">
        <div className="flex flex-col gap-1 md:hidden">
          <button
            type="button"
            onClick={() => {
              setIsExpanded(!isExpanded);

              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth",
              });
            }}
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

              <FollowPopover offset={height} />

              <NewsletterPopover offset={height} />

              <Link
                className="text-oxe-xs uppercase"
                href="/terms-and-conditions"
              >
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

        <span className="ml-auto whitespace-nowrap text-oxe-xs uppercase md:text-oxe-sm">
          {`© ${fullYear} Oxmose`}
        </span>
      </nav>
    </footer>
  );
}
