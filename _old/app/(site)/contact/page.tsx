// import { toPlainText } from "@portabletext/react";
// import { getHomePageTitle } from "lib/sanity.fetch";
// import { defineMetadata } from "lib/utils.metadata";

import { getContactLinks } from "_old/lib/sanity.fetch";

export default async function Contact() {
  const { pressKit, listenLinks, socialLinks } = await getContactLinks();

  return (
    <div className="divide-x divide-y">
      <div className="flex flex-col justify-between gap-6 px-2 py-2 md:px-7 md:py-5">
        <h2 className="text-4xl md:text-5xl lg:text-6xl">General Inquiry</h2>
        <a
          href="mailto:office@oxmose.com"
          className="text-right text-2xl hover:text-gray-600 md:mt-24 md:text-4xl lg:mt-48 lg:text-6xl"
        >{`office(at)oxmose.com`}</a>
      </div>

      <div className="grid divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
        <div className="flex flex-col justify-between px-2 py-2 md:px-7 md:py-5">
          <h2 className="mb-3 text-4xl md:mb-24 md:text-5xl lg:mb-48 lg:text-6xl">
            Listen
          </h2>
          <ul className="self-end text-right text-2xl md:list-disc md:text-left md:text-3xl">
            {listenLinks &&
              listenLinks.map((link, i) => (
                <li key={`listen-${i}`}>
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
        <div className="flex flex-col justify-between px-2 py-2 md:px-7 md:py-5">
          <h2 className="mb-3 text-4xl md:mb-24 md:text-5xl lg:mb-48 lg:text-6xl">
            Follow
          </h2>
          <ul className="self-end text-right text-2xl  md:list-disc md:text-left md:text-3xl">
            {socialLinks &&
              socialLinks.map((social, i) => (
                <li key={`social-${i}`}>
                  <a
                    href={social.href}
                    target="_blank"
                    className="hover:text-gray-600"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-2 py-2 md:px-7 md:py-5">
        <h2 className="text-4xl md:text-5xl lg:text-6xl">Demo</h2>
        <p className="text-lg tracking-tight md:text-3xl md:tracking-normal lg:text-4xl">
          We are open to demo proposals, please submit digital formats, tapes or
          CDs prior contact.
        </p>
        <a
          href="mailto:demo@oxmose.com"
          className="text-right text-2xl hover:text-gray-600 md:mt-24 md:text-4xl lg:mt-48 lg:text-6xl"
        >{`demo(at)oxmose.com`}</a>
      </div>

      <div className="grid divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
        <div className="flex flex-col justify-between gap-3 px-2 py-2 md:order-2 md:px-7 md:py-5">
          <h2 className="text-4xl md:mb-24 md:text-5xl lg:mb-48 lg:text-6xl">
            Press Kit
          </h2>
          <a
            href={`${pressKit}?dl=oxmose_presskit`}
            className="text-right text-2xl hover:text-gray-700 md:mt-24 md:text-4xl lg:mt-48 lg:text-6xl"
          >
            download
          </a>
        </div>
        <div className="flex flex-col justify-between gap-3 px-2 py-2 md:order-first md:px-7 md:py-5">
          <h2 className="text-4xl md:mb-24 md:text-5xl lg:mb-48 lg:text-6xl">
            Location
          </h2>
          <div className="flex flex-col justify-between gap-3 lg:flex-row">
            <div>
              <h4 className="text-lg font-bold md:text-3xl lg:text-4xl">
                Headquarters
              </h4>
              <p className="text-lg md:text-3xl lg:text-4xl">Paris</p>
            </div>
            <div>
              <h4 className="text-lg font-bold md:text-3xl lg:text-4xl">
                Office/Studio
              </h4>
              <p className="text-lg md:text-3xl lg:text-4xl">Bukarest</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
