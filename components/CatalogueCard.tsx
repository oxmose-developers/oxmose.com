import { Release } from "../groq";
import { urlForImage } from "../lib/sanity";

export default function CatalogueCard({ release }: { release: Release }) {
  const link = "/catalogue/" + release.slug.current;

  const url = urlForImage(release.coverImage).url();
  const webpUrl = urlForImage(release.coverImage).format("webp").url();

  return (
    <article className="divide-y divide-black bg-white">
      <div className="lg:p-9">
        <header className="mb-24 hidden lg:block">
          <h2 className="text-oxe-xxl font-medium">{release.title}</h2>
        </header>

        <div className="flex flex-col lg:flex-row-reverse lg:items-end lg:gap-9">
          <div className="aspect-square w-full">
            <picture>
              <source srcSet={webpUrl} type="image/webp" />
              <img
                className="aspect-square object-cover object-center"
                alt={`${release.title} Album Cover`}
                src={url}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>

          <div className="px-9 py-6 lg:p-0">
            <h2 className="block text-oxe-sm font-medium lg:hidden">
              {release.title}
            </h2>

            <p className="text-oxe-sm lg:-mb-2.5 lg:text-oxe-lg lg:font-medium">
              {release.artist[0].name}
            </p>
          </div>
        </div>
      </div>

      <footer className="border-t px-9 py-2">
        <div className="flex justify-between">
          <a
            className="text-oxe-xs font-medium uppercase lg:text-oxe-sm"
            href={link}
          >
            More
          </a>

          <button className="text-oxe-xs font-medium uppercase lg:text-oxe-sm">
            Listen
          </button>
        </div>
      </footer>
    </article>
  );
}
