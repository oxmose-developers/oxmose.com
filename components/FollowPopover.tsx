"use client";

import { useState } from "react";

const links = [
  {
    href: "https://www.instagram.com/oxmose",
    label: "Instagram",
  },
  {
    href: "https://www.facebook.com/oxmose",
    label: "Facebook",
  },
  {
    href: "https://twitter.com/oxmose_records",
    label: "X",
  },
  {
    href: "https://spoti.fi/34oYpfp",
    label: "Spotify",
  },
  {
    href: "https://oxmose.bandcamp.com/",
    label: "Bandcamp",
  },
  {
    href: "https://soundcloud.com/oxmose",
    label: "SoundCloud",
  },
] as const;

export default function FollowPopover() {
  const [isOpen, isOpenSet] = useState(false);

  return (
    <div className="">
      <button
        type="button"
        onClick={() => isOpenSet(!isOpen)}
        className="whitespace-nowrap text-oxe-xs uppercase lg:text-oxe-sm"
      >
        Follow
      </button>

      {isOpen && (
        <div className="absolute bottom-[3.75rem] left-0 right-0 z-50 flex min-h-[3.75rem] w-full items-center border-t border-black bg-white px-9 py-2 text-black lg:py-[13px] lg:pl-10">
          <div className="flex flex-wrap gap-10">
            {links.map((link, idx) => (
              <a
                href={link.href}
                target="_blank"
                rel="noopener nofollow"
                key={`${link.label}-${idx}`}
                className="text-oxe-xs font-medium uppercase lg:text-oxe-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => isOpenSet(!isOpen)}
            className="ml-auto"
          >
            <span className="sr-only">Close</span>
            <svg
              className="size-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 32 32"
            >
              <g clipPath="url(#a)">
                <path stroke="#000" strokeWidth={4} d="M30 2 2 30m28 0L2 2" />
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M0 0h32v32H0z" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
