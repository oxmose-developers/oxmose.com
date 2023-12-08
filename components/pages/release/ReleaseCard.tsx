import ImageBox from "components/shared/ImageBox";
import Link from "next/link";
import { ReleaseListPayload } from "types";

import ActionPanel from "./shared/ActionBar";

interface ReleaseCardProps {
  release: ReleaseListPayload | null;
  hrefRelease: string;
  hrefArtist: string;
}

export default function ReleaseCard({ data }: { data: ReleaseCardProps }) {
  const {release, hrefRelease, hrefArtist} = data || {};
  return (
    <div className="text-slate-800 border border-slate-400 mt-[-1px] ml-[-1px] flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between md:grow md:pr-7 md:pb-5">
        <Link href={hrefRelease} className="flex">
          <h2 className="px-7 pt-5 text-2xl font-semibold tracking-tight lg:text-3xl hover:text-slate-600 block md:basis-[40%] lg:basis-1/3">
            {release?.title}
          </h2>
        </Link>

        <Link href={hrefRelease} className="order-first md:order-2 mt-auto hover:opacity-90">
            <ImageBox
            image={release?.coverImage}
            imagePlaceholder={release?.coverImage?.lqip}
            alt={`Cover image for ${release?.title}`}
            height={500}
            width={500}
            classesWrapper="object-contain aspect-square mt-auto" 
          />
        </Link>

      </div>
      
      {/* TODO - get artist slug for link */}
      <Link href={hrefArtist} className="md:order-first flex">
        <h3 className="px-7 pb-5 text-2xl mt-auto tracking-tight md:font-semibold md:text-4xl md:py-5 lg:text-5xl hover:text-slate-600 md:basis-1/3 md:mb-8">
            {release?.artist.name}
        </h3>
      </Link>

      <ActionPanel 
        left={{href: hrefRelease, title: 'more'}}
        right={{href: '#', title: 'listen'}}
        classesWrapper="border-t order-last max-h-fit"
      />
    </div>
  )
}