import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

import { ArtistsQuery } from "../../../../groq";
import { client, urlForImage } from "../../../../lib/sanity";

export async function generateStaticParams() {
  const artists = await client.fetch<ArtistsQuery>(ArtistsQuery);

  return artists.map((artist) => {
    return {
      params: {
        slug: artist.slug.current,
      },
    };
  });
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const artists = await client.fetch<ArtistsQuery>(ArtistsQuery);

  const artist = artists.find((el) => el.slug.current === slug);

  if (!artist) {
    return notFound();
  }

  const index = artists.findIndex((el) => el.slug.current === slug);

  const prev = index === 0 ? artists[artists.length - 1] : artists[index - 1];

  const next = artists.length === index + 1 ? artists[0] : artists[index + 1];

  const url = urlForImage(artist.coverImage).url();

  const webpUrl = urlForImage(artist.coverImage).format("webp").url();

  return (
    <>
      <div className="border-b border-black px-9 lg:px-10">
        <h1 className="text-oxe-xxl-mobile/[60px] lg:text-oxe-xxl/[96px]">
          {artist.name}
        </h1>
      </div>

      <div className="flex h-10 items-center justify-between border-b border-black px-9 lg:px-10">
        <a
          href={`/artists/${prev.slug.current}`}
          className="text-oxe-sm font-medium uppercase"
        >
          Prev
        </a>

        <a
          href={`/artists/${next.slug.current}`}
          className="text-oxe-sm font-medium uppercase"
        >
          Next
        </a>
      </div>

      <div className="grid grid-cols-2 divide-x divide-black">
        <div className="p-10">
          <picture className="mb-10 block">
            <source srcSet={webpUrl} type="image/webp" />
            <img
              className="aspect-[16/10] w-full max-w-4xl object-cover object-center"
              alt={artist.name}
              src={url}
              loading="lazy"
              decoding="async"
            />
          </picture>

          <div className="prose text-black prose-p:text-oxe-md prose-a:text-black prose-a:underline prose-strong:font-medium">
            <PortableText value={artist.body} />
          </div>
        </div>

        <div className="grid grid-rows-[minmax(max-content,50svh)] p-10">
          <div className="grid grid-cols-[max-content,1fr] gap-4">
            <div className="mt-1 size-5 rounded-full border border-black bg-black"></div>

            <div>
              <h3 className="text-[35px]/[32px] font-medium uppercase">
                Release
              </h3>

              <a href="/">
                <article className="text-oxe-sm/[32px]">
                  <header>
                    <h3>Quandary</h3>
                    <p>#OXE 005</p>
                  </header>

                  <footer>
                    <time dateTime="2020">2020</time>
                  </footer>
                </article>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-[max-content,1fr] gap-4">
            <div className="mt-1 size-5 rounded-full border border-black bg-white"></div>

            <div>
              <h3 className="text-[35px]/[32px] font-medium uppercase">More</h3>

              <ul className="text-oxe-sm/[32px]">
                {artist.links?.map((link) => (
                  <li key={link._key}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
