import { ImageWithPlaceholder } from "types";

import ImageBox from "./ImageBox";


export default function ImageThumbnail({ images }: { images: ImageWithPlaceholder[] }) {
  
  return (
    <div className="px-4 row-start-2 mt-auto overflow-hidden ml-auto flex flex-col gap-2 lg:justify-evenly lg:flex-row  ">

      {
        images.map((image, index) => (
          <ImageBox
            key={index}
            image={image}
            imagePlaceholder={image?.lqip}
            alt={`Cover image for ${image.lqip}`}
            height={50}
            width={50}
            classesWrapper="aspect-square md:rounded-full h-[40px] w-[40px]"
          />
        ))
      }

      
    </div>
  );
}
