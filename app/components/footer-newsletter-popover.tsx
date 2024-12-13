"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

import { subscribeToNewsletter } from "../../lib/actions";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="text-oxe-sm/10 focus:outline-none md:text-oxe-lg/[3.875rem]"
      aria-disabled={pending}
      onClick={(e) => {
        if (pending) {
          e.preventDefault();
        }
      }}
    >
      Subscribe
    </button>
  );
}

const initialState = { message: "", success: false };

export default function NewsletterPopover({ offset }: { offset: number }) {
  const [isOpen, isOpenSet] = useState(false);

  const [state, formAction] = useActionState(
    subscribeToNewsletter,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      window.alert("Successfully subscribed!");

      isOpenSet(false);
    } else if (state.message.trim() !== "") {
      window.alert(state.message);
    }
  }, [state]);

  return (
    <div>
      <button
        type="button"
        className="text-oxe-xs uppercase md:text-oxe-sm"
        onClick={() => isOpenSet(!isOpen)}
      >
        Newsletter
      </button>

      {isOpen && (
        <form
          action={formAction}
          className="absolute bottom-[var(--offset)] left-0 right-0 z-50 grid divide-y divide-black border-t border-black bg-white text-black md:grid-cols-[1fr_min-content_min-content]"
          style={{ "--offset": `${offset}px` } as React.CSSProperties}
        >
          <div className="flex items-center px-9 py-1.5 md:col-span-full md:py-3">
            <p className="text-oxe-md/10 md:text-oxe-xxl">Stay in the loop</p>

            <button
              onClick={() => isOpenSet(!isOpen)}
              type="button"
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

          <div className="px-9 py-1.5 md:py-3">
            <label htmlFor="email" className="sr-only">
              Your email
            </label>

            <input
              id="email"
              autoCapitalize="off"
              autoComplete="email"
              autoCorrect="off"
              required
              className="form-input h-10 w-full border-0 text-oxe-sm/10 ring-0 placeholder:text-[#7B7878] focus:ring-0 focus:ring-offset-0 md:h-[3.875rem] md:text-oxe-lg/[3.875rem]"
              type="email"
              placeholder="Email"
              name="email"
            />
          </div>

          <div className="px-9 py-1.5 md:py-3">
            <div className="flex items-center gap-3 md:gap-6">
              <input
                className="form-checkbox size-4 rounded-full border-black checked:bg-black checked:bg-none hover:bg-black hover:ring-0 hover:ring-offset-0 checked:hover:bg-black focus:shadow-none focus:ring-0 focus:ring-black focus:ring-offset-0 checked:focus:bg-black md:size-5"
                id="newsletter-privacy-policy"
                required
                type="checkbox"
              />

              <label
                htmlFor="newsletter-privacy-policy"
                className="text-oxe-sm/10 md:whitespace-nowrap md:text-oxe-lg/[3.875rem]"
              >
                I accept the{" "}
                <Link href="/privacy-policy" className="underline">
                  privacy policy
                </Link>
              </label>
            </div>
          </div>

          <div className="border-black px-9 py-1.5 md:border-l md:py-3">
            <SubmitButton />
          </div>
        </form>
      )}
    </div>
  );
}
