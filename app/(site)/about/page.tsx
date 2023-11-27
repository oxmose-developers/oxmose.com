// import { toPlainText } from "@portabletext/react";
// import { getHomePageTitle } from "lib/sanity.fetch";
// import { defineMetadata } from "lib/utils.metadata";

import RoleCard from "components/shared/RoleCard";


export default function About() {
  return (
    <>
      <div className="lg:mt-10 px-7">
        <h2 className=" text-6xl">
          Oxmose is a french electronic record label. 
          The label defines its identity on contemporary 
          compositions, sound concepts and textures, while also 
          connecting the audience to a unique visual experience. 
          Oxmose is a platform for artistic freedom and imaginative enquiry
        </h2>
      </div>
      
      <div className="lg:mt-[180px] border-t divide-x border-slate-400 divide-slate-400 grid grid-cols-2">
        <div className="space-y-4   px-7 py-5">
          <RoleCard role="founder" credits={["Paul Allemand"]} />
          <RoleCard role="SOund engineers" credits={["Joe Bloggs"]} />
          <RoleCard role="designers" credits={["Joe Bloggs, Fanny Arbuckle"]} />
          <RoleCard role="developers" credits={["Jeff Reiner, Adam Griffiths"]} />
          <RoleCard role="copywriter" credits={["Joe Bloggs"]} />
          <RoleCard role="consultant" credits={["Joe Bloggs"]} />
            
        </div>
        <div className="space-y-4  px-7 py-5">
          <RoleCard role="Distribution" credits={["Japan, Australia, Europe, USA Bloke"]} />
          <RoleCard role="visual artists" credits={["Joe Bloggs"]} />
          <RoleCard role="film director" credits={["Joe Bloggs"]} />
          <RoleCard role="performing artist" credits={["Joe Bloggs"]} />
          <RoleCard role="legal affairs" credits={["Joe Bloggs"]} />

        </div>
      </div>
    </>
  )
}