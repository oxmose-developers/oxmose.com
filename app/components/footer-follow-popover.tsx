"use client";

import { useState } from "react";

import { links } from "../../constants/urls";

export default function FollowPopover({ offset }: { offset: number }) {
  const [isOpen, isOpenSet] = useState(false);

  return (
    <div>
      <button
        type="button"
        className="text-oxe-xs uppercase md:text-oxe-sm"
        onClick={() => isOpenSet(!isOpen)}
      >
        Follow
      </button>

      {isOpen && (
        <div
          className="absolute bottom-[var(--offset)] left-0 right-0 z-50 flex w-full items-start gap-4 border-t border-black bg-white px-9 py-3 text-black md:min-h-[3.75rem] md:items-center md:py-[0.8125rem] md:pl-10"
          style={{ "--offset": `${offset}px` } as React.CSSProperties}
        >
          <div className="flex flex-wrap gap-4 md:gap-10">
            {links.map((link, idx) => (
              <a
                href={link.href}
                target="_blank"
                key={`${link.label}-${idx}`}
                className="text-oxe-xs font-medium uppercase md:text-oxe-sm"
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
              className="size-4 md:size-7"
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
