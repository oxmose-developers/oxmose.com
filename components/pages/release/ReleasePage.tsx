/**
 * TO DO:
 * - make a toggle button
 */

import ExpandableText from "components/shared/ExpandableText";
import ImageBox from "components/shared/ImageBox";
import { getReleaseBySlug } from "lib/sanity.fetch";
import { ReleasePayload } from "types";

export interface ReleasePageProps {
  data: ReleasePayload | null;
}

export default function ReleasePage({data}: ReleasePageProps) {
  return (
    <>
      <div className="border border-slate-600">
        <ImageBox
          image={data?.coverImage}
          imagePlaceholder={data?.coverImage?.lqip}
          alt={`Cover image for ${data?.title}`}
          height={300}
          width={300}
          classesWrapper="aspect-square object-cover"
        />
        <div className="px-7 py-5">
          <h1 className="font-semibold text-2xl tracking-tight ">{data?.title}</h1>
          <h2 className="text-xl">{data?.artist.name}</h2>

        </div>
  
        {/* RELEASE FORMATS */}
        <div className="px-7 py-5">
          <ul>
            <li className="list-disc flex justify-between">
              <div>
                <p className="uppercase font-semibold text-xl">digital</p>
                <span className="text-sm">WAV 24bit</span>
              </div>
              <span className="font-semibold text-xl">{data?.digitalPrice}€</span>
            </li>
            <li className="list-[circle] flex justify-between">
              <div className="flex flex-col gap-0">
                <span className="uppercase font-semibold text-xl">vinyl</span>
                <span className="text-sm">{`12&" 180gr limited edition`}</span>
              </div>
              <span className="font-semibold text-xl">{data?.physicalPrice?.toFixed(2)}€</span>
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
          <span className="uppercase font-semibold text-xl">{data?.releaseReference}</span>
          <span className="uppercase font-semibold text-xl">{data?.releaseDate}</span>
        </div>
        <ExpandableText value={data?.description} maxLength={100} classesWrapper="leading-tight md:leading-normal" />
      </div>

      {/* TRACKLIST */}
      <div>
        <h3 className="px-7 py-3 font-semibold text-xl uppercase">TRACKLIST</h3>
      
        <table className="w-full font-semibold table-fixed text-left">
          <thead className="bg-black text-white uppercase text-lg">
            <tr>
              <th className="pl-7">#</th>
              <th className="w-[50%]">TITLE</th>
              <th className="pr-7 text-right">TIME</th>
            </tr>
          </thead>
          <tbody>
            {/* {tracks.map((track) => (
              <tr key={track.id}>
                <td>{track.number}</td>
                <td>{track.title}</td>
                <td>{formatTrackLength(track.length)}</td>
              </tr>
            ))} */}

            <tr>
              <td className="pl-7">01</td>
              <td >Hands</td>
              <td className="pr-7 text-right">3:45</td>
            </tr>
            <tr>
              <td className="pl-7">01</td>
              <td >Hands</td>
              <td className="pr-7 text-right">3:45</td>
            </tr>
            <tr>
              <td className="pl-7">01</td>
              <td >Hands</td>
              <td className="pr-7 text-right">3:45</td>
            </tr>
            <tr>
              <td className="pl-7">01</td>
              <td >Hands</td>
              <td className="pr-7 text-right">3:45</td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </>
  )
}