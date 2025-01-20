"use client";

import {
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";

import { OxmoseStillLogo, OxmoseAnimatedLogo } from "./logo";

export default function Navigation() {
  const [open, openSet] = useState(false);

  return (
    <nav className="shrink-0 border-b border-black bg-white pb-[1.0625rem] pt-[1.125rem] dark:border-white dark:bg-black md:py-6">
      <div className="md:max-w-[calc(100vw-8%)]">
        <div className="flex items-center px-9 md:px-10">
          <Link href="/">
            <span className="sr-only">Back to Catalogue</span>
            <OxmoseAnimatedLogo />
          </Link>

          <div className="ml-auto hidden items-center justify-center gap-10 md:flex">
            <Link
              className="whitespace-nowrap text-oxe-sm font-medium uppercase"
              href="/"
            >
              Catalogue
            </Link>

            <Link
              className="whitespace-nowrap text-oxe-sm font-medium uppercase"
              href="/artists"
            >
              Artists
            </Link>

            <Link
              className="whitespace-nowrap text-oxe-sm font-medium uppercase"
              href="/about"
            >
              À propos
            </Link>

            <Link
              className="whitespace-nowrap text-oxe-sm font-medium uppercase"
              href="/contact"
            >
              Contact
            </Link>
          </div>

          <div className="ml-auto dark:text-white md:hidden">
            <button
              className="flex size-10 items-center justify-center"
              onClick={() => openSet(true)}
            >
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={40}
                height={40}
                fill="none"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M38 13.395H2V11.5h36v1.895ZM38 20.974H2v-1.895h36v1.895ZM20 28.553H2v-1.895h18v1.895Z"
                  clipRule="evenodd"
                />
                <path
                  fill="currentColor"
                  d="M20 29.974a2.368 2.368 0 1 0 0-4.737 2.368 2.368 0 0 0 0 4.737Z"
                />
              </svg>
            </button>

            <Dialog
              open={open}
              onClose={() => openSet(false)}
              className="relative z-50 md:hidden"
            >
              <DialogBackdrop className="fixed inset-0 bg-black/15 dark:bg-black/80" />

              {/* Full-screen container to center the panel */}
              <div className="fixed inset-0">
                {/* The actual dialog panel */}
                <DialogPanel className="bg-white dark:bg-black">
                  <div className="pb-[1.0625rem] pt-[1.125rem]">
                    <div className="flex items-center justify-between px-9">
                      <Link href="/">
                        <span className="sr-only">Back to Catalogue</span>
                        <div className="relative -m-1 size-14 invert dark:invert-0">
                          <OxmoseStillLogo />
                        </div>
                      </Link>

                      <button
                        type="button"
                        onClick={() => openSet(false)}
                        className="flex size-10 items-center justify-center"
                      >
                        <span className="sr-only">Close menu</span>
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 32 32"
                        >
                          <g clipPath="url(#a)">
                            <path
                              stroke="currentColor"
                              strokeWidth={4}
                              d="M30 2 2 30m28 0L2 2"
                            />
                          </g>
                          <defs>
                            <clipPath id="a">
                              <path fill="#fff" d="M0 0h32v32H0z" />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="border-y border-black dark:border-white">
                    <div className="grid divide-y divide-black dark:divide-white">
                      <div className="px-4 py-2.5">
                        <CloseButton
                          as={Link}
                          className="flex whitespace-nowrap px-5 py-2.5 text-oxe-md/10"
                          href="/"
                        >
                          Catalogue
                        </CloseButton>
                      </div>

                      <div className="px-4 py-2.5">
                        <CloseButton
                          as={Link}
                          className="flex whitespace-nowrap px-5 py-2.5 text-oxe-md/10"
                          href="/artists"
                        >
                          Artists
                        </CloseButton>
                      </div>

                      <div className="px-4 py-2.5">
                        <CloseButton
                          as={Link}
                          className="flex whitespace-nowrap px-5 py-2.5 text-oxe-md/10"
                          href="/about"
                        >
                          À propos
                        </CloseButton>
                      </div>

                      <div className="px-4 py-2.5">
                        <CloseButton
                          as={Link}
                          className="flex whitespace-nowrap px-5 py-2.5 text-oxe-md/10"
                          href="/contact"
                        >
                          Contact
                        </CloseButton>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </nav>
  );
}
