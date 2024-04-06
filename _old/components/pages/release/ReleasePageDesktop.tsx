import { CustomPortableText } from "_old/components/shared/CustomPortableText";
import Expandable from "_old/components/shared/ExpandableComponent";
import ImageBox from "_old/components/shared/ImageBox";
import ImageThumbnail from "_old/components/shared/ImageThumbnail";
import { ReleasePayload } from "_old/types";

import ActionPanel from "./shared/ActionBar";
import Formats from "./shared/Formats";
import TrackList from "./shared/TrackList";

export interface ReleasePageProps {
  data: ReleasePayload | null;
}

export default function ReleasePageDesktop({ data }: ReleasePageProps) {
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
        <div className="grid h-[435px] grid-cols-[9fr_auto] grid-rows-[2fr_5fr_auto]  gap-2 lg:h-[600px]">
          {/* DETAILS Release date and label release reference */}
          <div className="col-span-2 flex h-fit justify-between border-b border-slate-400 px-3 py-2">
            <span className="text-xl font-semibold uppercase">
              {releaseReference}
            </span>
            <span className="text-xl font-semibold uppercase">
              {releaseDate}
            </span>
          </div>

          {/* Cover Image */}
          <div className="row-start-2 mt-auto pl-4">
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

          <div className="row-start-2 ml-auto mt-auto flex flex-col gap-2 overflow-hidden px-4 lg:flex-row lg:justify-evenly  ">
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
            left={{ href: "#", title: "prev" }}
            right={{ href: "#", title: "next" }}
            classesWrapper="border-y row-start-3 col-span-2"
          />
        </div>

        <div className="flex h-[435px] flex-col lg:h-[600px]">
          {/* Title & Artist */}
          <div className="flex justify-between px-7 py-5">
            <h1 className="basis-1/3 text-4xl font-semibold tracking-tight lg:text-5xl ">
              {artist?.name}
            </h1>
            <h2 className="mt-4 items-end self-end text-right text-2xl font-medium">
              {title}
            </h2>
          </div>

          {/* RELEASE FORMATS */}
          {digitalPrice && physicalPrice && (
            <Formats
              digitalPrice={digitalPrice}
              physicalPrice={physicalPrice}
              classesWrapper="px-7 py-5 lg:text"
            />
          )}

          {/* Stream */}
          <div className="mt-auto flex justify-between px-7 py-5">
            <h3 className="text-xl font-semibold uppercase lg:text-2xl">
              STREAM
            </h3>
            <div className="flex flex-col text-right  lg:text-lg">
              <p>Spotify</p>
              <p>Apple Music</p>
              <p>Deezer</p>
            </div>
          </div>

          {/* Buy Listen panel */}
          <ActionPanel
            left={{ href: "#", title: "buy" }}
            right={{ href: "#", title: "listen" }}
            classesWrapper=" border-y"
          />
        </div>
      </div>
      {/* Description */}
      <Expandable initialHeight="300px" classesWrapper="block px-7 py-5">
        {description && (
          <CustomPortableText value={description} paragraphClasses="text-3xl" />
        )}
      </Expandable>

      {/* TRACKLIST */}
      <div className="border-t border-slate-400">
        <h3 className="px-7 py-2 text-xl font-semibold uppercase">TRACKLIST</h3>
      </div>
      {trackList && <TrackList trackList={trackList} artist={artist?.name} />}
    </>
  );
}
