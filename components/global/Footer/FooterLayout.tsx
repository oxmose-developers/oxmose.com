import { CustomPortableText } from "components/shared/CustomPortableText";
import Link from "next/link";
import type { PortableTextBlock } from "sanity";
import type { SettingsPayload } from "types";

interface FooterProps {
  data: SettingsPayload;
}
export default function Footer(props: FooterProps) {
  const { data } = props;

  const footer = data?.footer || ([] as PortableTextBlock[]);

  return (
    <footer className="bottom-0 w-full bg-black text-white py-1 px-7 flex justify-between ">
      {/* {footer && (
        <CustomPortableText
          paragraphClasses="text-md md:text-xl"
          value={footer}
        />
      )} */}
      <ul className="uppercase flex gap-10">
        <li>
          <Link href="/publishing">Publishing</Link>
        </li>
        <li>          
          <Link href="/follow">Follow</Link>
        </li>
        <li>
          <Link href="/newsletter">Newsletter</Link>
        </li>
        <li>          
          <Link href="/terms">Terms</Link>
        </li>
        <li>
          <Link href="/privacy">Privacy</Link>
        </li>
        <li>          
          <Link href="/faq">FAQ</Link>
        </li>
      </ul>
      <p className="uppercase">&copy; 2023 oxmose</p>
    </footer>
  );
}
