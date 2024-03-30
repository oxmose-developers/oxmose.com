"use client";

import ImageBox from "_old/components/shared/ImageBox";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArtistListPayload } from "_old/types";

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
      <div key={artist._id} className="border-b divide-slate-400 px-2 py-1 md:px-5 md:py-3">
        <Link 
          href={href} 
          className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight"
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
            classesWrapper="hidden md:max-w-[300px] lg:max-w-[400px] h-auto md:absolute md:block md:right-8 md:top-1/2"
          />
        )
      }
    </>
  )
}