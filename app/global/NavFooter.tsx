"use client";

import Link from "next/link";
import useMeasure from "react-use-measure";

import FollowPopover from "./FollowPopover";
import FooterMobile from "./FooterMobile";
import NewsletterPopover from "./NewsletterPopover";

export default function Footer({ fullYear }: { fullYear: number }) {
  const [ref, { height }] = useMeasure();

  return (
    <footer
      ref={ref}
      className="relative shrink-0 bg-black py-2 text-white lg:py-[13px]"
    >
      <nav className="flex items-end px-9 lg:items-center lg:pl-10 lg:pr-20">
        <FooterMobile offset={height} />

        <div className="hidden gap-10 lg:flex">
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

        <span className="ml-auto whitespace-nowrap text-oxe-xs uppercase lg:text-oxe-sm">
          {`© ${fullYear} Oxmose`}
        </span>
      </nav>
    </footer>
  );
}
