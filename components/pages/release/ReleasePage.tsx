/**
 * TO DO:
 * - make a toggle button
 */

import { CustomPortableText } from "components/shared/CustomPortableText";
import Expandable from "components/shared/ExpandableComponent";
import ImageBox from "components/shared/ImageBox";
import { getReleaseBySlug } from "lib/sanity.fetch";
import { ReleasePayload } from "types";

export interface ReleasePageProps {
  data: ReleasePayload | null;
}

export default function ReleasePage({data}: ReleasePageProps) {
  const { 
    artist, 
    coverImage, 
    description, 
    digitalFormat, 
    digitalPrice, 
    links, 
    physicalFormat, 
    physicalPrice, 
    productImages,
    releaseDate, 
    releaseReference, 
    title, 
    trackList, 
    } = data ?? {};
  return (
    <>
      <div className="border border-slate-600 mx-[-1px]">
        <ImageBox
          image={coverImage}
          imagePlaceholder={coverImage?.lqip}
          alt={`Cover image for ${title}`}
          height={300}
          width={300}
          classesWrapper="aspect-square object-cover"
        />
        <div className="px-7 py-5">
          <h1 className="font-semibold text-2xl tracking-tight ">{title}</h1>
          <h2 className="text-xl">{artist?.name}</h2>

        </div>
  
        {/* RELEASE FORMATS */}
        <div className="px-7 py-5">
          <ul>
            <li className="list-disc flex justify-between">
              <div>
                <p className="uppercase font-semibold text-xl">digital</p>
                <span className="text-sm">WAV 24bit</span>
              </div>
              <span className="font-semibold text-xl">{digitalPrice?.toFixed(2)}€</span>
            </li>
            <li className="list-[circle] flex justify-between">
              <div className="flex flex-col gap-0">
                <span className="uppercase font-semibold text-xl">vinyl</span>
                <span className="text-sm">{`12&" 180gr limited edition`}</span>
              </div>
              <span className="font-semibold text-xl">{physicalPrice?.toFixed(2)}€</span>
            </li>
          </ul>
          <div className="mt-5 flex justify-between">
            <h3 className="uppercase font-semibold text-xl">STREAM</h3>
            <div className="flex flex-col text-right">
              <p>Spotify</p>
              <p>Apple Music</p>
              <p>Deezer</p>
            </div>
          </div>
        </div>

        <div className="static bottom-0 w-full flex justify-between border-t border-slate-600 px-7 py-1 uppercase text-xl font-semibold">
          <a href="#" className="block">buy</a>
          <a href="#" className="block">listen</a>
        </div>
      </div>

      {/* DETAILS Release date and label release reference */}
      <div className="px-7 py-5">
        <div className="flex justify-between pb-5">
          <span className="uppercase font-semibold text-xl">{releaseReference}</span>
          <span className="uppercase font-semibold text-xl">{releaseDate}</span>
        </div>
        <Expandable initialHeight="32rem">
          {description && <CustomPortableText value={description} paragraphClasses="leading-tight md:leading-normal"/>}
        </Expandable>
      </div>

      {/* TRACKLIST */}
      <div>
        <h3 className="mx-7 mb-3 font-semibold text-xl uppercase">TRACKLIST</h3>

        <table className="w-full font-semibold table-fixed text-left">
          <thead className="bg-black text-white uppercase text-lg">
            <tr>
              <th className="pl-7">#</th>
              <th className="w-[55%]">TITLE</th>
              <th className="pr-7 text-right">TIME</th>
            </tr>
          </thead>
          <tbody className="mt-3 py-2 px-4 text-lg before:h-3 before:block">
            {trackList?.map((track, index=1) => (
              <tr key={track._id}>
                <td className="pl-7">{index.toString().padStart(2, '0')}</td>
                <td>{track.title}</td>
                <td className="pr-7 text-right tracking-tight">{`${track.time.minutes} : ${track.time.seconds.padStart(2, '0')}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}