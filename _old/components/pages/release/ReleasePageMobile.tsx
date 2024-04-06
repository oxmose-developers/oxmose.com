import { CustomPortableText } from "_old/components/shared/CustomPortableText";
import Expandable from "_old/components/shared/ExpandableComponent";
import ImageBox from "_old/components/shared/ImageBox";
import { getReleaseBySlug } from "_old/lib/sanity.fetch";
import { ReleasePayload } from "_old/types";

import ActionPanel from "./shared/ActionBar";
import Formats from "./shared/Formats";
import TrackList from "./shared/TrackList";

export interface ReleasePageProps {
  data: ReleasePayload | null;
}

export default function ReleasePageMobile({ data }: ReleasePageProps) {
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
    <div className="mx-[-1px] border border-slate-400">
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
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <h2 className="text-xl">{artist?.name}</h2>
      </div>

      {/* RELEASE FORMATS */}
      {digitalPrice && physicalPrice && (
        <Formats
          digitalPrice={digitalPrice}
          physicalPrice={physicalPrice}
          classesWrapper="px-7 mb-5"
        />
      )}

      {/* Buy Listen panel */}
      <ActionPanel
        left={{ href: "#", title: "buy" }}
        right={{ href: "#", title: "listen" }}
        classesWrapper=" border-y"
      />

      {/* DETAILS Release date and label release reference */}
      <div className="flex justify-between px-7 py-5">
        <span className="text-xl font-semibold uppercase">
          {releaseReference}
        </span>
        <span className="text-xl font-semibold uppercase">{releaseDate}</span>
      </div>

      {/* Description */}
      <Expandable initialHeight="100px" classesWrapper="px-7 py-5">
        {description && (
          <CustomPortableText
            value={description}
            paragraphClasses="leading-tight md:leading-normal"
          />
        )}
      </Expandable>

      {/* TRACKLIST */}
      {trackList && <TrackList trackList={trackList} />}
    </div>
  );
}
