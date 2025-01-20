"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";

import type { Link as LinkType } from "../../sanity.types";
import FollowPopover from "./footer-follow-popover";
import NewsletterPopover from "./footer-newsletter-popover";

export default function Footer({
  fullYear,
  followLinks,
}: {
  fullYear: number;
  followLinks: LinkType[];
}) {
  const [isOpen, isOpenSet] = useState(false);

  const [ref, { height }] = useMeasure();

  useEffect(() => {
    /**
     * Check for if server-side
     */
    if (typeof document === "undefined") return;

    if (isOpen) {
      window.scrollTo({
        top: document?.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [isOpen]);

  const pathname = usePathname();

  useEffect(() => {
    isOpenSet(false);
  }, [pathname]);

  return (
    <footer ref={ref} className="relative shrink-0 bg-black text-white">
      <nav className="footer-padding flex min-h-[--footer-height] items-end px-9 pr-20 md:items-center md:pl-10 md:pr-24">
        <div className="flex flex-col gap-1 md:hidden">
          <button
            type="button"
            onClick={() => isOpenSet(!isOpen)}
            className="block self-start"
          >
            <span role="img" aria-hidden="true">
              {isOpen ? "↓" : "↑"}
            </span>

            <span className="sr-only">{isOpen ? "Close" : "Expand"}</span>
          </button>

          {isOpen && (
            <>
              <Link className="text-oxe-xxs uppercase" href="/publishing">
                Publishing
              </Link>

              <FollowPopover offset={height} followLinks={followLinks} />

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

          <FollowPopover offset={height} followLinks={followLinks} />

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
