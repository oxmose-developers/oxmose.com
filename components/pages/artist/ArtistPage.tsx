import { CustomPortableText } from "components/shared/CustomPortableText";
import { Header } from "components/shared/Header";
import ImageBox from "components/shared/ImageBox";
import type { ArtistPayload } from "types";

export interface ArtistPageProps {
  data: ArtistPayload | null;
}

export function ArtistPage({ data }: ArtistPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { coverImage, about, name, links } = data ?? {};

  return (
    <div>
      <div className="mb-20 space-y-6">
        {/* Header */}
        <Header title={name} />

        {/* Image */}
        <ImageBox
          image={coverImage}
          imagePlaceholder={coverImage?.lqip}
          alt={`Cover image for ${name}`}
          classesWrapper="relative aspect-[16/9]"
        />

        {/* Description */}
        {about && (
          <CustomPortableText
            paragraphClasses="max-w-3xl text-xl text-gray-600"
            value={about}
          />
        )}

        {/* Links */}
        {links && (
          <div className="flex flex-wrap gap-4 text-xl text-gray-800">
            {links.map((link) => (
              <a
                href={link.href}
                target="_blank"
                rel="noopener"
                key={link.href}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="absolute left-0 w-screen border-t" />
    </div>
  );
}

export default ArtistPage;
