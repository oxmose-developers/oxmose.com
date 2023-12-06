import { CustomPortableText } from "components/shared/CustomPortableText";
import Expandable from "components/shared/ExpandableComponent";
import ImageBox from "components/shared/ImageBox";
import ImageThumbnail from "components/shared/ImageThumbnail";
import { ReleasePayload } from "types";

import ActionPanel from "./shared/ActionBar";
import Formats from "./shared/Formats";
import TrackList from "./shared/TrackList";

export interface ReleasePageProps {
  data: ReleasePayload | null;
}

export default function ReleasePageDesktop({data}: ReleasePageProps) {
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
      <div className="mx-[-1px] grid grid-cols-2 divide-x divide-slate-400">

        <div className="grid grid-rows-[2fr_5fr_auto] grid-cols-[9fr_auto] gap-2  h-[435px] lg:h-[600px]">
          {/* DETAILS Release date and label release reference */}
          <div className="flex justify-between col-span-2 border-b border-slate-400 h-fit px-3 py-2">
            <span className="uppercase font-semibold text-xl">{releaseReference}</span>
            <span className="uppercase font-semibold text-xl">{releaseDate}</span>
          </div>

          {/* Cover Image */}
          <div className="px-4 row-start-2 mt-auto">
            <ImageBox
              image={coverImage}
              imagePlaceholder={coverImage?.lqip}
              alt={`Cover image for ${title}`}
              height={300}
              width={300}
              classesWrapper="aspect-square object-fit md:max-h-[335px] md:max-w-[335px] lg:max-w-[500px] lg:max-h-[500px]"
            />
          </div>

          {/* Thumbnail Images */}
          {/* {productImages && coverImage && <ImageThumbnail images={[coverImage, ...productImages]}/>} */}
          
          <div className="px-4 row-start-2 mt-auto overflow-hidden ml-auto flex flex-col gap-2 lg:justify-evenly lg:flex-row  ">
            <ImageBox
              image={coverImage}
              imagePlaceholder={coverImage?.lqip}
              alt={`Cover image for ${title}`}
              height={50}
              width={50}
              classesWrapper="aspect-square md:rounded-full h-[40px] w-[40px]"
            />
            <ImageBox
              image={coverImage}
              imagePlaceholder={coverImage?.lqip}
              alt={`Cover image for ${title}`}
              height={50}
              width={50}
              classesWrapper="aspect-square md:rounded-full h-[40px] w-[40px]"
            />
            <ImageBox
              image={coverImage}
              imagePlaceholder={coverImage?.lqip}
              alt={`Cover image for ${title}`}
              height={50}
              width={50}
              classesWrapper="aspect-square md:rounded-full h-[40px] w-[40px]"
            />
            </div>
          <ActionPanel 
            left={{href: '#', title: 'prev'}}
            right={{href: '#', title: 'next'}}
            classesWrapper="border-y row-start-3 col-span-2"
          />
        </div>
        
        <div className="flex flex-col h-[435px] lg:h-[600px]">
          {/* Title & Artist */}
          <div className="px-7 py-5">
            <h1 className="font-semibold text-4xl lg:text-5xl tracking-tight ">{title}</h1>
            <h2 className="text-2xl font-medium text-right mt-4">{artist?.name}</h2>
          </div>

          {/* RELEASE FORMATS */}
          {digitalPrice && physicalPrice &&
            <Formats digitalPrice={digitalPrice} physicalPrice={physicalPrice} classesWrapper="px-7 py-5 lg:text"/>
          }

          {/* Stream */}
          <div className="px-7 py-5 mt-auto flex justify-between">
            <h3 className="uppercase font-semibold text-xl lg:text-2xl">STREAM</h3>
            <div className="flex flex-col text-right  lg:text-lg">
              <p>Spotify</p>
              <p>Apple Music</p>
              <p>Deezer</p>
            </div>
          </div>
          
          {/* Buy Listen panel */}
          <ActionPanel 
            left={{href: '#', title: 'buy'}}
            right={{href: '#', title: 'listen'}}
            classesWrapper=" border-y"
          />
        </div>

        
      </div>
      {/* Description */}
      <Expandable initialHeight="300px" classesWrapper="block px-7 py-5">
        {description && <CustomPortableText value={description} paragraphClasses="text-3xl"/>}
      </Expandable>

      {/* TRACKLIST */}
      <div className="border-t border-slate-400">
        <h3 className="px-7 py-2 font-semibold text-xl uppercase">TRACKLIST</h3>
      </div>
        {trackList && <TrackList trackList={trackList} artist={artist?.name}/>}
    </>
  )
}