import { formatISO, getYear } from "date-fns";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity";

import { urlForImage } from "../../../lib/sanity";
import { fetchArtistPage } from "../../../lib/sanity";
import Pagination from "../../components/artist-pagination";

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
) {
  const params = await props.params;
  const existingMetadata = (await parent) as unknown as Metadata;

  const { slug } = params;

  const artist = await fetchArtistPage({ slug });

  return {
    title: artist.name,
    description: artist.overview,
    openGraph: {
      ...existingMetadata.openGraph,
      title: artist.name,
      description: artist.overview,
    },
    twitter: {
      ...existingMetadata.openGraph,
      title: artist.name,
      description: artist.overview,
    },
  } satisfies Metadata;
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;

  const artist = await fetchArtistPage({ slug });

  return (
    <div className="artist-single-page-layout grid md:grid-cols-2">
      <div
        className="px-9 md:border-b md:border-black md:px-10"
        style={{ gridArea: "name" }}
      >
        <h1 className="md:text-oxe-xxxxl/24 text-oxe-xl/15">{artist.name}</h1>
      </div>

      {/* Mobile-only Full Bleed Image */}
      <div
        className="relative block aspect-[16/10] w-full md:hidden"
        style={{ gridArea: "image" }}
      >
        <Image
          className="object-cover object-center"
          alt={artist.name}
          src={urlForImage(artist.coverImage).url()}
          placeholder="blur"
          blurDataURL={artist.coverImage.asset.metadata?.lqip}
          sizes="100vw"
          fill
        />
      </div>

      <Pagination slug={slug} style={{ gridArea: "pagination" }} />

      <div className="px-9 py-7 md:p-10" style={{ gridArea: "bio" }}>
        <Image
          className="mb-10 hidden aspect-[16/10] w-full max-w-4xl select-none object-cover object-center md:block"
          alt={artist.name}
          src={urlForImage(artist.coverImage)
            .width(896)
            .height(586)
            .dpr(3)
            .url()}
          width={896}
          height={586}
          draggable={false}
          placeholder="blur"
          blurDataURL={artist.coverImage.asset.metadata?.lqip}
        />

        <div className="prose-p:text-oxe-xxs/5 prose max-w-[unset] text-black prose-a:text-black prose-a:underline prose-strong:font-medium md:prose-p:text-oxe-md">
          <PortableText value={artist.body} />
        </div>
      </div>

      <div
        className="flex min-h-[28rem] flex-col px-9 py-7 md:grid md:auto-rows-[minmax(max-content,50svh)] md:border-l md:border-black md:p-10"
        style={{ gridArea: "info" }}
      >
        <div className="flex flex-1 items-start md:flex-col">
          <div className="flex items-center gap-1.5 md:gap-4">
            <div className="-mt-[0.1875rem] size-4 rounded-full border border-black bg-black md:size-5"></div>

            <h3 className="text-oxe-sm font-medium uppercase md:text-oxe-lg/8">
              Release
            </h3>
          </div>

          <ul className="ml-auto space-y-4 md:ml-0 md:pl-9">
            {[...(artist?.releases ?? [])].map((release) => (
              <li key={`${artist.slug}-${release.slug.current}`}>
                <Link href={`/catalogue/${release.slug.current}`}>
                  <article className="text-oxe-xxs text-right md:text-left md:text-oxe-sm/8">
                    <header>
                      <h3>{release.title}</h3>
                      <p>{release.releaseReference}</p>
                    </header>

                    <footer>
                      <time dateTime={formatISO(new Date(release.releaseDate))}>
                        {getYear(new Date(release.releaseDate))}
                      </time>
                    </footer>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-start md:flex-col">
          <div className="flex items-center gap-1.5 md:gap-4">
            <div className="-mt-[0.1875rem] size-4 rounded-full border border-black bg-white md:size-5"></div>

            <h3 className="text-oxe-sm font-medium uppercase md:text-oxe-lg/8">
              More
            </h3>
          </div>

          <ul className="text-oxe-xxs ml-auto text-right md:ml-0 md:pl-9 md:text-left md:text-oxe-sm/8">
            {[...(artist?.links ?? [])].map((link) => (
              <li key={link._key}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
