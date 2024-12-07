import { format, formatISO } from "date-fns";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { Fragment } from "react";

import { urlForImage } from "../../../../lib/sanity";
import { fetchReleasePage } from "../../../../lib/sanity/queries";
import { getProduct } from "../../../../lib/shopify";
import BuyButton from "../../../components/catalogue-buy-button";
import ListenButton from "../../../components/catalogue-listen-button";
import Pagination from "../../../components/catalogue-pagination";
import {
  ProductCarousel,
  ProductFullBleedScroller,
} from "../../../components/catalogue-product-carousel";
import Tracklist from "../../../components/catalogue-tracklist";
import VariantSelector from "../../../components/catalogue-variant-selector";

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const existingMetadata = (await parent) as unknown as Metadata;

  const { slug } = params;

  const page = await fetchReleasePage({ slug });

  return {
    title: page.title,
    description: page.overview,
    openGraph: {
      ...existingMetadata.openGraph,
      title: page.title,
      description: page.overview,
    },
    twitter: {
      ...existingMetadata.twitter,
      title: page.title,
      description: page.overview,
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const release = await fetchReleasePage({ slug });

  const [digitalProductResult, physicalProductResult] =
    await Promise.allSettled([
      getProduct(release.shopifyProductDigital),
      getProduct(release.shopifyProductPhysical),
    ]);

  const physicalProduct =
    physicalProductResult.status === "fulfilled"
      ? physicalProductResult.value
      : undefined;

  const digitalProduct =
    digitalProductResult.status === "fulfilled"
      ? digitalProductResult.value
      : undefined;

  return (
    <div>
      {/* Desktop Design */}
      <div className="hidden min-h-[85svh] grid-cols-2 lg:grid">
        <div className="flex flex-col border-r border-black">
          {/* ID & Release Date */}
          <div className="shrink-0 border-b border-black px-9">
            <div className="flex h-10 items-center justify-between">
              <p className="text-oxe-sm font-medium">
                {release.releaseReference}
              </p>

              <p className="text-oxe-sm font-medium">
                <time dateTime={formatISO(new Date(release.releaseDate))}>
                  {format(new Date(release.releaseDate), "MMMM do, yyyy")}
                </time>
              </p>
            </div>
          </div>

          <ProductCarousel productImages={release.productImages} />

          {/* Pagination */}
          <Pagination slug={slug} />
        </div>

        <div className="flex flex-col">
          {/* Title & Artist */}
          <div className="flex flex-col px-9 pt-7 lg:gap-5">
            <p className="text-oxe-md font-medium lg:text-oxe-xxl">
              {release.title}
            </p>

            <p className="text-oxe-sm/[2rem] lg:self-end lg:text-right lg:text-oxe-lg lg:font-medium">
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
            {digitalProduct && physicalProduct && (
              <VariantSelector
                products={[
                  {
                    type: "Digital",
                    product: digitalProduct,
                    format: release.digitalProductFormat,
                  },
                  {
                    type: "Vinyl",
                    product: physicalProduct,
                    format: release.physicalProductFormat,
                  },
                ]}
              />
            )}

            <div className="flex items-start">
              <h3 className="text-[2.1875rem]/[2rem] font-medium uppercase">
                Stream
              </h3>

              <ul className="ml-auto text-right text-oxe-md/[2rem]">
                {[...(release?.links ?? [])].map((link) => (
                  <li key={link._key}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex h-10 items-center justify-between border-y border-black px-9 lg:px-10">
            {digitalProduct && physicalProduct && (
              <BuyButton
                products={[
                  {
                    type: "Digital",
                    product: digitalProduct,
                    format: release.digitalProductFormat,
                  },
                  {
                    type: "Vinyl",
                    product: physicalProduct,
                    format: release.physicalProductFormat,
                  },
                ]}
                defaultProduct={{
                  type: "Digital",
                  product: digitalProduct,
                  format: release.digitalProductFormat,
                }}
              />
            )}

            {release?.trackList?.tracks?.every((el) => el.file) && (
              <ListenButton
                tracks={release.trackList}
                album={release.title}
                artwork={urlForImage(release.productImages[0])
                  .width(512)
                  .height(512)
                  .format("jpg")
                  .url()}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Design */}
      <div className="block lg:hidden">
        {/* Pagination */}
        <Pagination slug={slug} />

        <ProductFullBleedScroller productImages={release.productImages} />

        <div className="px-9 py-7">
          {/* Title & Artist */}
          <div className="mb-5">
            <p className="text-oxe-md font-medium">{release.title}</p>

            <p className="text-oxe-sm/[2rem]">
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

          {/* Purchase  */}
          {digitalProduct && physicalProduct && (
            <VariantSelector
              products={[
                {
                  type: "Digital",
                  product: digitalProduct,
                  format: release.digitalProductFormat,
                },
                {
                  type: "Vinyl",
                  product: physicalProduct,
                  format: release.physicalProductFormat,
                },
              ]}
            />
          )}

          {/* Stream Links */}
          <div className="mt-5 flex items-start">
            <h3 className="text-oxe-sm font-medium uppercase lg:text-[2.1875rem]/[2rem]">
              Stream
            </h3>

            <ul className="ml-auto text-right text-oxe-xs lg:text-left lg:text-oxe-sm/[2rem]">
              {[...(release?.links ?? [])].map((link) => (
                <li key={link._key}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Buy & Listen */}
        <div className="flex h-10 items-center justify-between border-y border-black px-9 lg:px-10">
          {digitalProduct && physicalProduct && (
            <BuyButton
              products={[
                {
                  type: "Digital",
                  product: digitalProduct,
                  format: release.digitalProductFormat,
                },
                {
                  type: "Vinyl",
                  product: physicalProduct,
                  format: release.physicalProductFormat,
                },
              ]}
              defaultProduct={{
                type: "Digital",
                product: digitalProduct,
                format: release.digitalProductFormat,
              }}
            />
          )}

          {release?.trackList?.tracks?.every((el) => el.file) && (
            <ListenButton
              tracks={release.trackList}
              album={release.title}
              artwork={urlForImage(release.productImages[0])
                .width(512)
                .height(512)
                .format("jpg")
                .url()}
            />
          )}
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

      {release?.trackList && (
        <>
          <section className="lg:border-t lg:border-black">
            <div className="px-9 py-2 lg:px-10">
              <h3 className="text-oxe-sm font-medium uppercase">Tracklist</h3>
            </div>
          </section>

          <Tracklist
            tracks={release.trackList}
            album={release.title}
            artwork={urlForImage(release.productImages[0])
              .width(512)
              .height(512)
              .format("jpg")
              .url()}
          />
        </>
      )}
    </div>
  );
}
