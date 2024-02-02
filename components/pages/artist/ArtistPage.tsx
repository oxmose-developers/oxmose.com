import { CustomPortableText } from "components/shared/CustomPortableText";
import { Header } from "components/shared/Header";
import ImageBox from "components/shared/ImageBox";
import { resolveHref } from "lib/sanity.links";
import Link from "next/link";
import { resolve } from "styled-jsx/css";
import type { ArtistPayload, ReleasePayload } from "types";

export interface ArtistPageProps {
  artist: ArtistPayload | null;
  releases: ReleasePayload[] | null;
}

export function ArtistPage({ artist, releases }: ArtistPageProps) {
  const { coverImage, about, name, links } = artist ?? {};
  // const { slug, releaseDate, title, releaseReference } = releases ?? {}

  return (
    <div className="border-b divide-x divide-y h-full">

      {/* Header */}
      <h1 className="px-7 py-2 text-6xl">{name}</h1>

      <div className="grid lg:grid-cols-2 divide-x h-[600px] overflow-y-auto">
        <div className="px-7 py-5">
          {/* Description */}
          {about && (
            <CustomPortableText
              paragraphClasses="max-w-3xl text-xl text-slate-800"
              value={about}
            />
          )}
        </div>
        <div className="px-7 py-5 flex flex-col">
          <div className="basis-1/2 flex gap-2 before:content-[''] before:block before:h-4 before:w-4 before:rounded-full before:bg-black before:mt-2">
            <div>
              <h4 className="text-3xl">RELEASE</h4>
              {/* get releasesbyartist */}
              <ul className="flex gap-8 flex-wrap text-xl tracking-tight">
                {
                  releases && releases.map((release) => {
                  const href = resolveHref(release._type, release.slug)
                  if(!href) return null;
                  return (
                    <li key={release._id}>
                      <Link href={href}  className="hover:text-gray-600">
                        <p>{release.title}</p>
                        <p className="tracking-tighter">{release.releaseReference}</p>
                        <p>{release.releaseDate?.slice(0, 4)}</p>
                      </Link>
                    </li>
                  )})
                }
              </ul>

            </div>
          </div>
          
          <div className="basis-1/2 flex gap-2 before:content-[''] before:block before:h-4 before:w-4 before:rounded-full before:border before:border-black before:mt-2">
            <div className="flex w-full justify-between">
              <div className="basis-1/2">
                <h4  className="text-3xl">MORE</h4>
                <ul className="text-xl">
                  {links && links.map((link, i) => (
                    <li key={`link-${i}`}>
                      <a href={link.href} target="_blank" className="hover:text-gray-600">{link.name}</a>
                    </li>

                  ))}
                </ul>
              </div>
              {coverImage &&
                
                <ImageBox
                  image={coverImage}
                  imagePlaceholder={coverImage.lqip}
                  alt={`Artist image for ${name}`}
                  height={200}
                  width={500}
                  classesWrapper="object-contain"
                />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistPage;