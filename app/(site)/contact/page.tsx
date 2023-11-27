// import { toPlainText } from "@portabletext/react";
// import { getHomePageTitle } from "lib/sanity.fetch";
// import { defineMetadata } from "lib/utils.metadata";

import RoleCard from "components/shared/RoleCard";
import Link from "next/link";


export default function About() {
  return (
    <div className="divide-x divide-y">
      <div className="flex flex-col justify-between px-7 py-5">
        <h2 className="text-6xl ">General Inquiry</h2>
        <a href="office@oxmose.com"className="text-6xl text-right lg:mt-48">{`office(at)oxmose.com`}</a>
      </div>
      
      <div className="divide-x grid grid-cols-2">
        <div className="px-7 py-5 flex flex-col justify-between">
          <h2 className="text-6xl mb-48">Listen</h2>
          <ul className="self-end list-disc text-4xl">
            <li>
              spotify
            </li>
            <li>
              bandcamp
            </li>
          </ul>
        </div>
        <div className="px-7 py-5 flex flex-col justify-between">
          <h2 className="text-6xl mb-48">Follow</h2>
          <ul className="self-end list-disc text-3xl">
            <li>
              instagram
            </li>
            <li>
              facebook
            </li>
          </ul>
        </div>
      </div>

      <div className="px-7 py-5 flex flex-col">
        <h2 className="text-6xl mb-5">Demo</h2>
        <p className="text-4xl">We are open to demo proposals, please submit digital formats, tapes or CDs prior contact.</p>
        <a href="demo@oxmose.com"className="text-6xl text-right mt-24">{`demo(at)oxmose.com`}</a>
      </div>

      <div className="divide-x grid grid-cols-2">
        <div className="px-7 py-5 flex flex-col justify-between">
          <h2 className="text-6xl mb-48">Location</h2>
          <div className="flex justify-between">
            <div>
              <h4 className="text-4xl font-bold">Headquarters</h4>
              <p className="text-4xl">Paris</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold">Office/Studio</h4>
              <p className="text-4xl">Bukarest</p>
            </div>
          </div>
        </div>
        <div className="px-7 py-5 flex flex-col justify-between">
          <h2 className="text-6xl mb-48">Press Kit</h2>
          <a className="text-6xl text-right">download</a>
        </div>
      </div>
    </div>
  )
}