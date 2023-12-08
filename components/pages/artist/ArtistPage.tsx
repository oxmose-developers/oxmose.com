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

      <div className="grid lg:grid-cols-2 divide-x">
        <div className="px-7 py-5">
          {/* Description */}
          {about && (
            <CustomPortableText
              paragraphClasses="max-w-3xl text-xl text-slate-800"
              value={about}
            />
          )}
        </div>
        <div className="px-7 py-5 grid grid-rows-2">
          <div className="">
            <h4 className="text-3xl">RELEASE</h4>
            {/* get releasesbyartist */}
            <ul className="flex gap-5 flex-wrap text-lg">
              {
                releases && releases.map((release) => {
                const href = resolveHref(release._type, release.slug)
                if(!href) return null;
                return (
                  <li key={release._id}>
                    <Link href={href}>
                      <p>{release.title}</p>
                      <p>{release.releaseReference}</p>
                      <p>{release.releaseDate?.slice(0, 4)}</p>
                    </Link>
                  </li>
                )})
              }
            </ul>
          </div>
          
          <div>
            <h4  className="text-3xl">MORE</h4>
            {/* get links */}
            <ul>
              {links && links.map((link, i) => (
                <li key={`link-${i}`}>
                  <a href={link.href} target="_blank">{link.name}</a>
                </li>

              ))}
            </ul>
            
            
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistPage;


// <div>
//       <div className="mb-20 space-y-6">
        {/* Header */}
        {/* <Header title={name} /> */}

        {/* Image */}
        // <ImageBox
        //   image={coverImage}
        //   imagePlaceholder={coverImage?.lqip}
        //   alt={`Cover image for ${name}`}
        //   classesWrapper="relative aspect-[16/9]"
        // />

        {/* Description */}
        // {about && (
        //   <CustomPortableText
        //     paragraphClasses="max-w-3xl text-xl text-gray-600"
        //     value={about}
        //   />
        // )}

        {/* Links */}
    //     {links && (
    //       <div className="flex flex-wrap gap-4 text-xl text-gray-800">
    //         {links.map((link) => (
    //           <a
    //             href={link.href}
    //             target="_blank"
    //             rel="noopener"
    //             key={link.href}
    //           >
    //             {link.name}
    //           </a>
    //         ))}
    //       </div>
    //     )}
    //   </div>

    //   <div className="absolute left-0 w-screen border-t" />
    // </div>