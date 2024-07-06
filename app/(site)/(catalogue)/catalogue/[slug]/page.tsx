import { PortableText } from "@portabletext/react";
import { format, formatISO } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment, Suspense } from "react";

import { urlForImage } from "../../../../../lib/sanity";
import { fetchReleasePage, fetchReleasesStaticParams } from "../../loader";
import Pagination from "./components/Pagination";
import Product from "./components/Product";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const releases = await fetchReleasesStaticParams();

  return releases.map((release) => {
    return {
      params: { slug: release.slug.current },
    };
  });
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const release = await fetchReleasePage({ slug });

  if (!release) {
    return notFound();
  }

  const productImagesCarousel = release.productImages.map((image) => ({
    _key: image._key as string,
    src: urlForImage(image).url(),
    webp: urlForImage(image).format("webp").url(),
  }));

  return (
    <div>
      {/* Desktop Design */}
      <div className="hidden grid-cols-2 lg:grid">
        <div className="flex flex-col border-r border-black">
          {/* ID & Release Date */}
          <div className="border-b border-black px-9">
            <div className="flex justify-between">
              <p className="text-oxe-sm font-medium">
                {release.releaseReference}
              </p>

              <p className="text-oxe-sm font-medium">
                <time dateTime={formatISO(new Date(release.releaseDate))}>
                  {format(new Date(release.releaseDate), "MMMM d, yyyy")}
                </time>
              </p>
            </div>
          </div>

          {/* Carousel */}
          <div className="flex-1 lg:p-10">
            <div className="aspect-square"></div>
          </div>

          {/* Pagination */}
          <Pagination slug={slug} />
        </div>

        <div className="flex flex-col">
          {/* Title & Artist */}
          <div className="flex flex-col px-9 pt-7 lg:gap-5">
            <p className="text-oxe-md font-medium lg:text-oxe-xxl">
              {release.title}
            </p>

            <p className="text-oxe-sm/[32px] lg:self-end lg:text-right lg:text-oxe-lg lg:font-medium">
              {release.artist.map((artist, idx, artists) => (
                <Fragment key={artist.slug.current}>
                  <Link href={`/artists/${artist.slug.current}`}>
                    {artist.name}
                  </Link>

                  {idx !== artists.length - 1 && <span>{", "}</span>}
                </Fragment>
              ))}
            </p>
          </div>

          {/* Purchase & Stream */}
          <div className="flex flex-1 flex-col px-9 py-7">
            <div className="flex flex-1 flex-col gap-5">
              <Suspense fallback={null}>
                <Product
                  type={"Digital"}
                  handle={release.shopifyProductDigital}
                />
              </Suspense>

              <Suspense fallback={null}>
                <Product
                  type={"Vinyl"}
                  handle={release.shopifyProductPhysical}
                />
              </Suspense>
            </div>

            <div className="flex items-start">
              <h3 className="text-[35px]/[32px] font-medium uppercase">
                Stream
              </h3>

              <ul className="ml-auto text-right text-oxe-md/[32px]">
                {[...(release?.links ?? [])].map((link) => (
                  <li key={link._key}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex h-10 items-center justify-between border-y border-black px-9 lg:px-10">
            <div className="text-oxe-sm font-medium uppercase">Buy</div>

            <div className="text-oxe-sm font-medium uppercase">Listen</div>
          </div>
        </div>
      </div>

      {/* Mobile Design */}
      <div className="block lg:hidden">
        {/* Pagination */}
        <Pagination slug={slug} />

        <div>
          {/* Mobile Product Images */}
          <div className="relative flex aspect-square w-full snap-x snap-mandatory overflow-x-auto">
            {productImagesCarousel.map(({ webp, _key }) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt={""}
                className="aspect-square shrink-0 snap-center object-cover object-center"
                decoding="async"
                key={_key}
                loading="lazy"
                src={webp}
              />
            ))}
          </div>

          <div className="px-9 py-7">
            {/* Title & Artist */}
            <div className="mb-5">
              <p className="text-oxe-md font-medium">{release.title}</p>

              <p className="text-oxe-sm/[32px]">
                {release.artist.map((artist, idx, artists) => (
                  <Fragment key={artist.slug.current}>
                    <Link href={`/artists/${artist.slug.current}`}>
                      {artist.name}
                    </Link>

                    {idx !== artists.length - 1 && <span>{", "}</span>}
                  </Fragment>
                ))}
              </p>
            </div>

            {/* Stream Links */}
            <div className="flex items-start">
              <h3 className="text-oxe-sm font-medium uppercase lg:text-[35px]/[32px]">
                Stream
              </h3>

              <ul className="ml-auto text-right text-oxe-xs lg:text-left lg:text-oxe-sm/[32px]">
                {[...(release?.links ?? [])].map((link) => (
                  <li key={link._key}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Buy & Listen */}
        <div className="flex h-10 items-center justify-between border-y border-black px-9 lg:px-10">
          <div className="text-oxe-sm font-medium uppercase">Buy</div>

          <div className="text-oxe-sm font-medium uppercase">Listen</div>
        </div>
      </div>

      {/* Description */}
      <div className="px-9 pt-7 lg:px-10 lg:pb-7">
        {/* ID & Release Date */}
        <div className="mb-5 flex justify-between lg:hidden">
          <p className="text-oxe-sm font-medium">{release.releaseReference}</p>

          <p className="text-oxe-sm font-medium">
            <time dateTime={formatISO(new Date(release.releaseDate))}>
              {format(new Date(release.releaseDate), "dd.MM.yy")}
            </time>
          </p>
        </div>

        <div className="prose max-w-[unset] text-black prose-p:text-oxe-xs/5 prose-a:text-black prose-a:underline prose-strong:font-medium lg:prose-p:text-oxe-lg lg:prose-p:font-medium">
          <PortableText value={release.description} />
        </div>
      </div>

      {/* Tracklist */}
      <section className="lg:border-t lg:border-black">
        <div className="px-9 py-2 lg:px-10">
          <h3 className="text-oxe-sm font-medium uppercase">Tracklist</h3>
        </div>
      </section>
    </div>
  );
}
