import { ImageWithPlaceholder } from "_old/types";

import ImageBox from "./ImageBox";

export default function ImageThumbnail({
  images,
}: {
  images: ImageWithPlaceholder[];
}) {
  return (
    <div className="row-start-2 ml-auto mt-auto flex flex-col gap-2 overflow-hidden px-4 lg:flex-row lg:justify-evenly  ">
      {images.map((image, index) => (
        <ImageBox
          key={index}
          image={image}
          imagePlaceholder={image?.lqip}
          alt={`Cover image for ${image.lqip}`}
          height={50}
          width={50}
          classesWrapper="aspect-square md:rounded-full h-[40px] w-[40px]"
        />
      ))}
    </div>
  );
}
