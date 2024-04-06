import { CustomPortableText } from "_old/components/shared/CustomPortableText";
import { Header } from "_old/components/shared/Header";
import ImageBox from "_old/components/shared/ImageBox";
import { resolveHref } from "_old/lib/sanity.links";
import Link from "next/link";
import { resolve } from "styled-jsx/css";
import type { ArtistPayload, ReleasePayload } from "_old/types";

export interface ArtistPageProps {
  artist: ArtistPayload | null;
  releases: ReleasePayload[] | null;
}

export function ArtistPage({ artist, releases }: ArtistPageProps) {
  const { coverImage, about, name, links } = artist ?? {};
  // const { slug, releaseDate, title, releaseReference } = releases ?? {}

  return (
    <div className="h-full divide-x divide-y border-b">
      {/* Header */}
      <h1 className="px-7 py-2 text-6xl">{name}</h1>

      <div className="grid h-[600px] divide-x overflow-y-auto lg:grid-cols-2">
        <div className="px-7 py-5">
          {/* Description */}
          {about && (
            <CustomPortableText
              paragraphClasses="max-w-3xl text-xl text-slate-800"
              value={about}
            />
          )}
        </div>
        <div className="flex flex-col px-7 py-5">
          <div className="flex basis-1/2 gap-2 before:mt-2 before:block before:h-4 before:w-4 before:rounded-full before:bg-black before:content-['']">
            <div>
              <h4 className="text-3xl">RELEASE</h4>
              {/* get releasesbyartist */}
              <ul className="flex flex-wrap gap-8 text-xl tracking-tight">
                {releases &&
                  releases.map((release) => {
                    const href = resolveHref(release._type, release.slug);
                    if (!href) return null;
                    return (
                      <li key={release._id}>
                        <Link href={href} className="hover:text-gray-600">
                          <p>{release.title}</p>
                          <p className="tracking-tighter">
                            {release.releaseReference}
                          </p>
                          <p>{release.releaseDate?.slice(0, 4)}</p>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>

          <div className="flex basis-1/2 gap-2 before:mt-2 before:block before:h-4 before:w-4 before:rounded-full before:border before:border-black before:content-['']">
            <div className="flex w-full justify-between">
              <div className="basis-1/2">
                <h4 className="text-3xl">MORE</h4>
                <ul className="text-xl">
                  {links &&
                    links.map((link, i) => (
                      <li key={`link-${i}`}>
                        <a
                          href={link.href}
                          target="_blank"
                          className="hover:text-gray-600"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
              {coverImage && (
                <ImageBox
                  image={coverImage}
                  imagePlaceholder={coverImage.lqip}
                  alt={`Artist image for ${name}`}
                  height={200}
                  width={500}
                  classesWrapper="object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistPage;
