"use client";

import * as Popover from "@radix-ui/react-popover";

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
];

export default function FollowPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger className="whitespace-nowrap text-oxe-xs uppercase lg:text-oxe-sm">
        Follow
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="start"
          sideOffset={20}
          className="flex flex-col gap-10 bg-black p-10 text-oxe-xs text-white lg:text-oxe-sm"
        >
          {links.map((link, idx) => (
            <a
              href={link.href}
              target="_blank"
              rel="noopener nofollow"
              key={`${link.label}-${idx}`}
            >
              {link.label}
            </a>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
