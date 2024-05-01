import Link from "next/link";

import FollowPopover from "../../components/FollowPopover";
import BackToTop from "./backToTop";

export default function Footer() {
  const fullYear = new Date().getFullYear();

  return (
    <footer className="relative shrink-0 bg-black py-2 text-white lg:py-[13px]">
      <nav className="flex px-9 lg:pl-10 lg:pr-20">
        <BackToTop />

        <div className="hidden gap-10 lg:flex">
          <Link
            className="whitespace-nowrap text-oxe-xs uppercase lg:text-oxe-sm"
            href="/publishing"
          >
            Publishing
          </Link>

          <FollowPopover />

          <Link
            className="whitespace-nowrap text-oxe-xs uppercase lg:text-oxe-sm"
            href="/terms-and-conditions"
          >
            Terms
          </Link>

          <Link
            className="whitespace-nowrap text-oxe-xs uppercase lg:text-oxe-sm"
            href="/privacy-policy"
          >
            Privacy
          </Link>

          <Link
            className="whitespace-nowrap text-oxe-xs uppercase lg:text-oxe-sm"
            href="/faq"
          >
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
