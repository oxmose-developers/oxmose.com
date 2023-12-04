import { CustomPortableText } from "components/shared/CustomPortableText";
import Expandable from "components/shared/ExpandableComponent";
import ImageBox from "components/shared/ImageBox";
import { getReleaseBySlug } from "lib/sanity.fetch";
import { ReleasePayload } from "types";

import ActionPanel from "./shared/ActionBar";
import Formats from "./shared/Formats";
import TrackList from "./shared/TrackList";

export interface ReleasePageProps {
  data: ReleasePayload | null;
}

export default function ReleasePageMobile({data}: ReleasePageProps) {
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
      <div className="border border-slate-400 mx-[-1px]">
        
        <ImageBox
          image={coverImage}
          imagePlaceholder={coverImage?.lqip}
          alt={`Cover image for ${title}`}
          height={300}
          width={300}
          classesWrapper="aspect-square object-cover"
        />

        {/* Title & Artist */}
        <div className="px-7 py-5">
          <h1 className="font-semibold text-2xl tracking-tight">{title}</h1>
          <h2 className="text-xl">{artist?.name}</h2>
        </div>
  
        {/* RELEASE FORMATS */}
        {digitalPrice && physicalPrice &&
          <Formats digitalPrice={digitalPrice} physicalPrice={physicalPrice}/>
        }

        {/* Buy Listen panel */}
        <ActionPanel 
          left={{href: '#', title: 'buy'}}
          right={{href: '#', title: 'listen'}}
          classesWrapper=" border-y"
        />

      {/* DETAILS Release date and label release reference */}
      <div className="flex justify-between px-7 py-5">
        <span className="uppercase font-semibold text-xl">{releaseReference}</span>
        <span className="uppercase font-semibold text-xl">{releaseDate}</span>
      </div>

      {/* Description */}
      <Expandable initialHeight="100px" classesWrapper="px-7 py-5">
        {description && <CustomPortableText value={description} paragraphClasses="leading-tight md:leading-normal"/>}
      </Expandable>

      {/* TRACKLIST */}
      {trackList && <TrackList trackList={trackList} />}
    </div>
  )
}
