import { format, formatISO } from "date-fns";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { hasAtLeast } from "remeda";

import { ProductProvider } from "../../../context/product-context";
import { fetchReleasePage, urlForImage } from "../../../lib/sanity";
import { getProduct } from "../../../lib/shopify";
import BuyButton from "../../components/catalogue-buy-button";
import ListenButton from "../../components/catalogue-listen-button";
import Pagination from "../../components/catalogue-pagination";
import {
  ProductCarousel,
  ProductFullBleedScroller,
} from "../../components/catalogue-product-carousel";
import VariantSelector, {
  type DigitalOrVinylProductVariant,
} from "../../components/catalogue-variant-selector";
import Tracklist from "../../components/tracklist";

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params;
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

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
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
    <ProductProvider>
      <div>
        {/* Desktop Design */}
        <div className="hidden grid-cols-2 md:grid">
          <div className="flex flex-col border-r border-black">
            {/* ID & Release Date */}
            <div className="mb-[var(--catalogue-fluid-size)] shrink-0 border-b border-black px-9">
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
            <div className="flex flex-col px-9 pt-7 md:gap-5">
              <p className="text-oxe-md font-medium md:text-oxe-xxxxl">
                {release.title}
              </p>

              <p className="text-oxe-sm/8 md:self-end md:text-right md:text-oxe-xxl md:font-medium">
                {[...(release?.artist ?? [])].map((artist, idx, artists) => (
                  <span key={artist.slug.current}>
                    <Link href={`/artists/${artist.slug.current}`}>
                      {artist.name}
                    </Link>

                    {idx !== artists.length - 1 && <span>{", "}</span>}
                  </span>
                ))}
              </p>
            </div>

            {/* Purchase & Stream */}
            <div className="flex flex-1 flex-col px-9 py-7">
              {digitalProduct && (
                <VariantSelector
                  products={[
                    {
                      type: "Digital",
                      product: digitalProduct,
                      format: release.digitalProductFormat,
                    },
                    ...(physicalProduct
                      ? [
                          {
                            type: "Vinyl",
                            product: physicalProduct,
                            format: release.physicalProductFormat,
                          } as DigitalOrVinylProductVariant,
                        ]
                      : []),
                  ]}
                />
              )}

              <div className="flex items-start">
                <h3 className="text-oxe-lg/8 font-medium uppercase">Stream</h3>

                <ul className="ml-auto text-right text-oxe-md/8">
                  {[...(release?.links ?? [])].map((link) => (
                    <li key={link._key}>
                      <a href={link.href} target="_blank">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex h-10 items-center justify-between border-y border-black px-9 md:px-10">
              {digitalProduct && (
                <BuyButton
                  products={[
                    {
                      type: "Digital",
                      product: digitalProduct,
                      format: release.digitalProductFormat,
                    },
                    ...(physicalProduct
                      ? [
                          {
                            type: "Vinyl",
                            product: physicalProduct,
                            format: release.physicalProductFormat,
                          } as DigitalOrVinylProductVariant,
                        ]
                      : []),
                  ]}
                  defaultProduct={{
                    type: "Digital",
                    product: digitalProduct,
                    format: release.digitalProductFormat,
                  }}
                />
              )}

              {!!release?.trackList &&
                hasAtLeast(release.trackList.tracks, 1) &&
                release?.trackList?.tracks?.every((el) => el.file) && (
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
        <div className="block md:hidden">
          {/* Pagination */}
          <Pagination slug={slug} />

          <ProductFullBleedScroller productImages={release.productImages} />

          <div className="px-9 py-7">
            {/* Title & Artist */}
            <div className="mb-9">
              <p className="text-oxe-md font-medium">{release.title}</p>

              <p className="text-oxe-sm/8">
                {[...(release?.artist ?? [])].map((artist, idx, artists) => (
                  <span key={artist.slug.current}>
                    <Link href={`/artists/${artist.slug.current}`}>
                      {artist.name}
                    </Link>

                    {idx !== artists.length - 1 && <span>{", "}</span>}
                  </span>
                ))}
              </p>
            </div>

            {/* Purchase  */}
            {digitalProduct && (
              <VariantSelector
                products={[
                  {
                    type: "Digital",
                    product: digitalProduct,
                    format: release.digitalProductFormat,
                  },
                  ...(physicalProduct
                    ? [
                        {
                          type: "Vinyl",
                          product: physicalProduct,
                          format: release.physicalProductFormat,
                        } as DigitalOrVinylProductVariant,
                      ]
                    : []),
                ]}
              />
            )}

            {/* Stream Links */}
            <div className="mt-9 flex items-start">
              <h3 className="text-oxe-sm font-medium uppercase md:text-oxe-lg/8">
                Stream
              </h3>

              <ul className="ml-auto text-right text-oxe-xxs md:text-left md:text-oxe-sm/8">
                {[...(release?.links ?? [])].map((link) => (
                  <li key={link._key}>
                    <a href={link.href} target="_blank">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Buy & Listen */}
          <div className="flex h-10 items-center justify-between border-y border-black px-9 md:px-10">
            {digitalProduct && (
              <BuyButton
                products={[
                  {
                    type: "Digital",
                    product: digitalProduct,
                    format: release.digitalProductFormat,
                  },
                  ...(physicalProduct
                    ? [
                        {
                          type: "Vinyl",
                          product: physicalProduct,
                          format: release.physicalProductFormat,
                        } as DigitalOrVinylProductVariant,
                      ]
                    : []),
                ]}
                defaultProduct={{
                  type: "Digital",
                  product: digitalProduct,
                  format: release.digitalProductFormat,
                }}
              />
            )}

            {release?.trackList &&
              hasAtLeast(release.trackList.tracks, 1) &&
              release?.trackList?.tracks?.every((el) => el.file) && (
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
        <div className="px-9 pt-7 md:px-10 md:pb-7">
          {/* ID & Release Date */}
          <div className="mb-5 flex justify-between md:hidden">
            <p className="text-oxe-sm font-medium">
              {release.releaseReference}
            </p>

            <p className="text-oxe-sm font-medium">
              <time dateTime={formatISO(new Date(release.releaseDate))}>
                {format(new Date(release.releaseDate), "dd.MM.yy")}
              </time>
            </p>
          </div>

          <div className="prose max-w-[unset] text-black prose-p:text-oxe-xxs/5 prose-a:text-black prose-a:underline prose-strong:font-medium md:prose-p:text-oxe-xxl md:prose-p:font-medium">
            <PortableText value={release.description} />
          </div>
        </div>

        {release?.trackList && hasAtLeast(release.trackList.tracks, 1) && (
          <>
            <section className="mt-7 md:mt-0 md:border-t md:border-black">
              <div className="px-9 py-2 md:px-10">
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
    </ProductProvider>
  );
}
