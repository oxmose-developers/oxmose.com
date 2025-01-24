import NextLink from "next/link";
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity";

import type { Link } from "../../lib/sanity";

interface ResolvedLinkProps {
  link: Link;
  className?: string;
}

export default function ResolvedLink({
  link,
  children,
  className,
}: React.PropsWithChildren<ResolvedLinkProps>) {
  if (typeof link.href === "string") {
    return (
      <NextLink
        href={link.href}
        target={"_blank"}
        rel={"noreferrer"}
        className={className}
      >
        {children}
      </NextLink>
    );
  }
  return <>{children}</>;
}

export function CustomPortableText({ value }: { value: PortableTextBlock[] }) {
  const components: PortableTextComponents = {
    marks: {
      link: ({ children, value: link }) => {
        return <ResolvedLink link={link}>{children}</ResolvedLink>;
      },
    },
  };

  return <PortableText components={components} value={value} />;
}
