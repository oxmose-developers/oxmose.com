"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { subscribeToNewsletter } from "../../lib/actions";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="text-oxe-sm/10 lg:text-oxe-lg"
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

export default function NewsletterPopover({ offset }: { offset: number }) {
  const [isOpen, isOpenSet] = useState(false);

  const [state, formAction] = useFormState(subscribeToNewsletter, {
    message: "",
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      window.alert("Successfully subscribed!");

      isOpenSet(false);
    }
  }, [state.success]);

  return (
    <div>
      <button
        type="button"
        className="text-oxe-xs uppercase lg:text-oxe-sm"
        onClick={() => isOpenSet(!isOpen)}
      >
        Newsletter
      </button>

      {isOpen && (
        <form
          action={formAction}
          className="absolute bottom-[var(--offset)] left-0 right-0 z-50 grid divide-y divide-black border-t border-black bg-white text-black lg:grid-cols-[1fr_min-content_min-content]"
          style={{ "--offset": `${offset}px` } as React.CSSProperties}
        >
          <div className="flex items-center px-9 py-1.5 lg:col-span-full lg:py-3">
            <p className="text-oxe-md/10 lg:text-oxe-xxl">Stay in the loop</p>

            <button
              onClick={() => isOpenSet(!isOpen)}
              type="button"
              className="ml-auto"
            >
              <span className="sr-only">Close</span>
              <svg
                className="size-4 lg:size-7"
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

          <div className="px-9 py-1.5 lg:py-3">
            <label htmlFor="email" className="sr-only">
              Your email
            </label>

            <input
              id="email"
              autoCapitalize="off"
              autoComplete="email"
              autoCorrect="off"
              required
              className="w-full text-oxe-sm/10 placeholder:text-[#7B7878] lg:text-oxe-lg"
              type="email"
              placeholder="Email"
              name="email"
            />
          </div>

          <div className="px-9 py-1.5 lg:py-3">
            <div className="flex items-center gap-3 lg:gap-6">
              <input id="newsletter-privacy-policy" required type="checkbox" />

              <label
                htmlFor="newsletter-privacy-policy"
                className="text-oxe-sm/10 lg:whitespace-nowrap lg:text-oxe-lg"
              >
                I accept the{" "}
                <a href="" className="underline">
                  privacy policy
                </a>
              </label>
            </div>
          </div>

          <div className="border-black px-9 py-1.5 lg:border-l lg:py-3">
            <SubmitButton />
          </div>
        </form>
      )}
    </div>
  );
}
