"use client";

import ImageBox from "components/shared/ImageBox";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArtistListPayload } from "types";

export default function ArtistListItem({ artist, href }: { artist: ArtistListPayload, href: string }) {
  const [revealArtist, setRevealArtist] = useState<ArtistListPayload | null>()

  function handleMouseEnter() {
    setRevealArtist(artist)
  }
  function handleMouseLeave() {
    setRevealArtist(null)
  }

  return (
    <>
      <div key={artist._id} className="border-b border-t border-black px-5 py-3">
        <Link 
          href={href} 
          className="block text-5xl font-medium tracking-tight"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {artist.name}
        </Link>
      </div>

      {
        revealArtist && (
          <ImageBox
            image={revealArtist.coverImage}
            imagePlaceholder={revealArtist.coverImage.lqip}
            alt={`Artist image for ${revealArtist.name}`}
            height={350}
            width={475}
            classesWrapper="hidden w-[30%] h-auto absolute right-8 top-1/2 md:block"
          />
        )
      }
    </>
  )
}