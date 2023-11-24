import ImageBox from "components/shared/ImageBox";
import Link from "next/link";
import { ReleaseListPayload } from "types";

interface ReleaseCardProps {
  release: ReleaseListPayload | null;
  hrefRelease: string;
  hrefArtist: string;
}

export default function ReleaseCard({ data }: { data: ReleaseCardProps }) {
  const {release, hrefRelease, hrefArtist} = data || {};
  return (
    <div className="relative text-slate-800 border border-slate-600 mt-[-1px] ml-[-1px] h-fit">
      <div className="flex flex-col md:grid md:grid-rows-[3fr_7fr] md:grid-cols-[1fr_3fr] md:gap-2 md:py-6 md:px-7 md:h-[435px] lg:h-fit">
        <h2 className="px-7 pt-5 text-2xl font-semibold tracking-tight md:order-first md:col-span-2 md:text-4xl md:p-0 lg:text-5xl hover:text-slate-600">
          <Link href={hrefRelease}>
            {release?.title}
          </Link>
        </h2>

        <Link href={hrefRelease} className="order-first md:col-start-2 md:col-span-1 mt-auto hover:opacity-90">
            <ImageBox
            image={release?.coverImage}
            imagePlaceholder={release?.coverImage?.lqip}
            alt={`Cover image for ${release?.title}`}
            height={800}
            width={800}
            classesWrapper="aspect-square object-fit "
          />
        </Link>
        
        {/* TODO - get artist slug for link */}
        <h3 className="col-start-1 row-start-2 px-7 pb-5 text-2xl mt-auto tracking-tight md:font-semibold md:p-0 lg:text-3xl hover:text-slate-600">
          <Link href={hrefArtist}>
            {release?.artist.name}
          </Link>
        </h3>
      </div>
      <div className="static bottom-0 w-full flex justify-between border-t border-slate-600 px-7 py-2 uppercase text-md font-semibold">
        <Link href={hrefRelease} className="block">more</Link>
        <a href="#" className="block">listen</a>
      </div>
    </div>
  )
}