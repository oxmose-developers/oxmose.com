import ImageBox from "_old/components/shared/ImageBox";
import Link from "next/link";
import { ReleaseListPayload } from "_old/types";

import ActionPanel from "./shared/ActionBar";

interface ReleaseCardProps {
  release: ReleaseListPayload | null;
  hrefRelease: string;
  hrefArtist: string;
}

export default function ReleaseCard({ data }: { data: ReleaseCardProps }) {
  const { release, hrefRelease, hrefArtist } = data || {};
  return (
    <div className="ml-[-1px] mt-[-1px] flex flex-col border border-slate-400 text-slate-800">
      <div className="flex flex-col md:grow md:flex-row md:items-end md:justify-between md:pb-5 md:pr-7">
        <Link href={hrefRelease} className="flex">
          <h2 className="block px-7 pt-5 text-2xl font-semibold tracking-tight hover:text-slate-600 md:basis-[40%] lg:basis-1/3 lg:text-3xl">
            {release?.title}
          </h2>
        </Link>

        <Link
          href={hrefRelease}
          className="order-first mt-auto hover:opacity-90 md:order-2"
        >
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
      <Link href={hrefArtist} className="flex md:order-first">
        <h3 className="mt-auto px-7 pb-5 text-2xl tracking-tight hover:text-slate-600 md:mb-8 md:basis-1/3 md:py-5 md:text-4xl md:font-semibold lg:text-5xl">
          {release?.artist.name}
        </h3>
      </Link>

      <ActionPanel
        left={{ href: hrefRelease, title: "more" }}
        right={{ href: "#", title: "listen" }}
        classesWrapper="border-t order-last max-h-fit"
      />
    </div>
  );
}
