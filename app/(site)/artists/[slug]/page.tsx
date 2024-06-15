import { PortableText } from "@portabletext/react";
import { formatISO, getYear } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";

import { urlForImage } from "../../../../lib/sanity";
import { fetchArtistPage, fetchArtistsStaticParams } from "../loader";
import Pagination from "./components/pagination";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const artists = await fetchArtistsStaticParams();

  return artists.map((artist) => {
    return {
      params: { slug: artist.slug.current },
    };
  });
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const artist = await fetchArtistPage({ slug });

  if (!artist) {
    return notFound();
  }

  const url = urlForImage(artist.coverImage).url();

  const webpUrl = urlForImage(artist.coverImage).format("webp").url();

  return (
    <div className="artist-single-page-layout grid lg:grid-cols-2">
      <div
        className="px-9 lg:border-b lg:border-black lg:px-10"
        style={{ gridArea: "name" }}
      >
        <h1 className="text-oxe-xxl-mobile/[60px] lg:text-oxe-xxl/[96px]">
          {artist.name}
        </h1>
      </div>

      {/* Mobile-only Full Bleed Image */}
      <div className="block lg:hidden" style={{ gridArea: "image" }}>
        <picture className="block">
          <source srcSet={webpUrl} type="image/webp" />

          <img
            className="aspect-[16/10] w-full object-cover object-center"
            alt={artist.name}
            src={url}
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>

      <Pagination slug={slug} style={{ gridArea: "pagination" }} />

      <div className="px-9 py-7 lg:p-10" style={{ gridArea: "bio" }}>
        <picture className="mb-10 hidden lg:block">
          <source srcSet={webpUrl} type="image/webp" />
          <img
            className="aspect-[16/10] w-full max-w-4xl object-cover object-center"
            alt={artist.name}
            src={url}
            loading="lazy"
            decoding="async"
          />
        </picture>

        <div className="prose max-w-[unset] text-black prose-p:text-oxe-xs/5 prose-a:text-black prose-a:underline prose-strong:font-medium lg:prose-p:text-oxe-md">
          <PortableText value={artist.body} />
        </div>
      </div>

      <div
        className="flex min-h-[28rem] flex-col px-9 py-7 lg:grid lg:auto-rows-[minmax(max-content,50svh)] lg:border-l lg:border-black lg:p-10"
        style={{ gridArea: "info" }}
      >
        <div className="flex flex-1 items-start lg:flex-col">
          <div className="flex items-center gap-1.5 lg:gap-4">
            <div className="-mt-[3px] size-4 rounded-full border border-black bg-black lg:size-5"></div>

            <h3 className="text-oxe-sm font-medium uppercase lg:text-[35px]/[32px]">
              Release
            </h3>
          </div>

          <ul className="ml-auto space-y-4 lg:ml-0 lg:pl-9">
            {[...(artist?.releases ?? [])].map((release) => (
              <li key={`${artist.slug}-${release.slug.current}`}>
                <Link href={`/catalogue/${release.slug.current}`}>
                  <article className="text-right text-oxe-xs lg:text-left lg:text-oxe-sm/[32px]">
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

        <div className="flex items-start lg:flex-col">
          <div className="flex items-center gap-1.5 lg:gap-4">
            <div className="-mt-[3px] size-4 rounded-full border border-black bg-white lg:size-5"></div>

            <h3 className="text-oxe-sm font-medium uppercase lg:text-[35px]/[32px]">
              More
            </h3>
          </div>

          <ul className="ml-auto text-right text-oxe-xs lg:ml-0 lg:pl-9 lg:text-left lg:text-oxe-sm/[32px]">
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
