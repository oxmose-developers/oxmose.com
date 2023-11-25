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
    <div className=" text-slate-800 border border-slate-400 mt-[-1px] ml-[-1px] flex flex-col md:grid md:grid-rows-[2fr_5fr_auto] md:grid-cols-[2fr_5fr]">
      <h2 className="px-7 pt-5 text-2xl font-semibold tracking-tight md:order-first md:col-span-2 md:text-4xl lg:text-5xl hover:text-slate-600">
        <Link href={hrefRelease}>
          {release?.title}
        </Link>
      </h2>

      <Link href={hrefRelease} className="order-first  mt-auto md:px-7 md:pb-5 md:col-start-2 md:col-span-1 hover:opacity-90">
          <ImageBox
          image={release?.coverImage}
          imagePlaceholder={release?.coverImage?.lqip}
          alt={`Cover image for ${release?.title}`}
          height={500}
          width={500}
          classesWrapper="object-fit"
        />
      </Link>
      
      {/* TODO - get artist slug for link */}
      <h3 className="col-start-1 row-start-2 px-7 pb-5 text-2xl mt-auto tracking-tight md:font-semibold lg:text-3xl hover:text-slate-600">
        <Link href={hrefArtist}>
          {release?.artist.name}
        </Link>
      </h3>

      <ActionPanel 
        left={{href: hrefRelease, title: 'more'}}
        right={{href: '#', title: 'listen'}}
        classesWrapper="row-start-3 col-span-2 border-t"
      />
    </div>
  )
}