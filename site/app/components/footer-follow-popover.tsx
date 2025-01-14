"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import type { Link } from "../../sanity.types";
import {
  OpenPopover,
  setOpenPopover,
  useGlobalStore,
} from "../../store/global-store";

export default function FollowPopover({
  offset,
  followLinks,
}: {
  offset: number;
  followLinks: Link[];
}) {
  const { openPopover } = useGlobalStore();

  return (
    <div>
      <button
        type="button"
        className="text-oxe-xxs uppercase md:text-oxe-sm"
        onClick={() => setOpenPopover(OpenPopover.FOLLOW)}
      >
        Follow
      </button>

      <Dialog
        open={openPopover === OpenPopover.FOLLOW}
        onClose={() => setOpenPopover(undefined)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0" />

        <DialogPanel
          className="md:min-h-oxe-xxxl absolute bottom-[var(--offset)] left-0 right-0 z-50 flex w-full items-start gap-4 border-t border-black bg-white px-9 py-3 text-black md:items-center md:py-[0.8125rem] md:pl-10"
          style={{ "--offset": `${offset}px` } as React.CSSProperties}
        >
          <div className="flex flex-wrap gap-4 md:gap-10">
            {followLinks.map((link, idx) => (
              <a
                href={link.href}
                target="_blank"
                key={`${link.name}-${idx}`}
                className="text-oxe-xxs font-medium uppercase md:text-oxe-sm"
              >
                {link.name}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOpenPopover(undefined)}
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
        </DialogPanel>
      </Dialog>
    </div>
  );
}
