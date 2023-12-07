// import { toPlainText } from "@portabletext/react";
// import { getHomePageTitle } from "lib/sanity.fetch";
// import { defineMetadata } from "lib/utils.metadata";

import { getContactLinks } from "lib/sanity.fetch"

export default async function Contact() {
  const { pressKit, listenLinks, socialLinks} = await getContactLinks();

  return (
    <div className="divide-x divide-y">
      <div className="flex flex-col justify-between gap-6 px-2 py-2 md:px-7 md:py-5">
        <h2 className="text-4xl md:text-5xl lg:text-6xl">General Inquiry</h2>
        <a href="mailto:office@oxmose.com"className="text-2xl text-right md:text-4xl md:mt-24 lg:text-6xl lg:mt-48 hover:text-gray-600">{`office(at)oxmose.com`}</a>
      </div>
      
      <div className="divide-y md:divide-x md:divide-y-0 grid md:grid-cols-2">
        <div className="px-2 py-2 md:px-7 md:py-5 flex flex-col justify-between">
          <h2 className="text-4xl mb-3 md:text-5xl md:mb-24 lg:text-6xl lg:mb-48">Listen</h2>
          <ul className="self-end text-right md:text-left md:list-disc text-2xl md:text-3xl">
            {listenLinks && listenLinks.map((link, i) => (
              <li key={`listen-${i}`}>
                <a href={link.href} target="_blank" className="hover:text-gray-600">{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-2 py-2 md:px-7 md:py-5 flex flex-col justify-between">
          <h2 className="text-4xl mb-3 md:text-5xl md:mb-24 lg:text-6xl lg:mb-48">Follow</h2>
          <ul className="self-end text-right md:text-left  md:list-disc text-2xl md:text-3xl">
          {socialLinks && socialLinks.map((social, i) => (
              <li key={`social-${i}`}>
                <a href={social.href} target="_blank" className="hover:text-gray-600">{social.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-2 py-2 md:px-7 md:py-5 flex flex-col gap-3">
        <h2 className="text-4xl md:text-5xl lg:text-6xl">Demo</h2>
        <p className="text-lg tracking-tight md:tracking-normal md:text-3xl lg:text-4xl">We are open to demo proposals, please submit digital formats, tapes or CDs prior contact.</p>
        <a href="mailto:demo@oxmose.com"className="text-2xl text-right md:text-4xl md:mt-24 lg:text-6xl lg:mt-48 hover:text-gray-600">{`demo(at)oxmose.com`}</a>
      </div>

      <div className="divide-y md:divide-x md:divide-y-0 grid md:grid-cols-2">
        <div className="px-2 py-2 md:order-2 md:px-7 md:py-5 flex flex-col gap-3 justify-between">
          <h2 className="text-4xl md:text-5xl md:mb-24 lg:text-6xl lg:mb-48">Press Kit</h2>
          <a href={`${pressKit}?dl=oxmose_presskit`} className="text-2xl text-right md:text-4xl md:mt-24 lg:text-6xl lg:mt-48 hover:text-gray-700">download</a>
        </div>
        <div className="px-2 py-2 md:order-first md:px-7 md:py-5 flex flex-col gap-3 justify-between">
          <h2 className="text-4xl md:text-5xl md:mb-24 lg:text-6xl lg:mb-48">Location</h2>
          <div className="flex flex-col gap-3 justify-between lg:flex-row">
            <div>
              <h4 className="text-lg md:text-3xl lg:text-4xl font-bold">Headquarters</h4>
              <p className="text-lg md:text-3xl lg:text-4xl">Paris</p>
            </div>
            <div>
              <h4 className="text-lg md:text-3xl lg:text-4xl font-bold">Office/Studio</h4>
              <p className="text-lg md:text-3xl lg:text-4xl">Bukarest</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}