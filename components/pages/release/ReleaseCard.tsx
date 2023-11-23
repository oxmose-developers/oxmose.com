import ImageBox from "components/shared/ImageBox";
import Link from "next/link";

export default function ReleaseCard({data}) {
  const {release, href} = data;
  return (
    <div className="relative text-slate-800 border border-slate-600 mt-[-1px] ml-[-1px]">
      <div className="flex flex-col md:grid md:grid-rows-[2fr_5fr] md:grid-cols-[1fr_3fr] max-h-[465px] md:gap-2 md:py-6 md:px-7 h-[435px] lg:h-auto">

        
        <h2 className="px-7 pt-5 text-2xl font-semibold tracking-tight md:order-first md:col-span-2 md:text-4xl md:p-0 lg:text-5xl hover:text-slate-600">
          <Link href={href}>
            {release.title}
          </Link>
        </h2>

        <Link href={href} className="order-first md:col-start-2 md:col-span-1 mt-auto hover:opacity-90">
            <ImageBox
            image={release.coverImage}
            imagePlaceholder={release.coverImage?.lqip}
            alt={`Cover image for ${release.title}`}
            height={300}
            width={300}
            classesWrapper="aspect-square object-cover"
          />
        </Link>
        
        {/* TODO - get artist slug for link */}
        <h3 className="col-start-1 row-start-2 px-7 pb-5 text-2xl mt-auto tracking-tight md:font-semibold md:p-0 lg:text-3xl hover:text-slate-600">
          <Link href={release.artist.name}>
            {release.artist.name}
          </Link>
        </h3>
      </div>
      <div className="static bottom-0 w-full flex justify-between border-t border-slate-600 px-7 py-2 uppercase text-md font-semibold">
        <Link href={href} className="block">more</Link>
        <a href="#" className="block">listen</a>
      </div>
    </div>
  )
}