// import { toPlainText } from "@portabletext/react";
// import { getHomePageTitle } from "lib/sanity.fetch";
// import { defineMetadata } from "lib/utils.metadata";

import { CustomPortableText } from "components/shared/CustomPortableText";
import RoleCard from "components/shared/RoleCard";
import { getAboutPage, getTeams } from "lib/sanity.fetch";


export default async function About() {
  const teams = await getTeams();
  const about = await getAboutPage();
  
  const splitIndex = Math.ceil(teams.length / 2);
  const leftHalf = teams.slice(0, splitIndex);
  const rightHalf = teams.slice(splitIndex);

  return (
    <>
      <header className="px-5 mt-4 mb-4 lg:mt-10 lg:px-7">
        {about && about.overview && 
          <CustomPortableText value={about.overview} paragraphClasses="text-2xl tracking-tighter md:text-5xl md:tracking-normal lg:text-6xl"/>
        }
      </header>
      
      <main>
        <section className="lg:mt-[180px] border-t divide-x border-slate-400 divide-slate-400 grid lg:grid-cols-2">
          <div className="space-y-4 px-7 py-5">
            {leftHalf && 
              leftHalf.map((role) => (
                <RoleCard key={role._id} role={role.position} members={role.members} />
              ))
            }
          </div>
          <div className="space-y-4  px-7 lg:py-5">
          {rightHalf && 
              rightHalf.map((role) => (
                <RoleCard key={role._id} role={role.position} members={role.members} />
              ))
            }
          </div>
        </section>
      </main>
    </>
  )
}