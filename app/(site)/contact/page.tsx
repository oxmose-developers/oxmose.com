import { PortableText } from "@portabletext/react";

import { ContactQuery } from "../../../groq";
import { client } from "../../../lib/sanity";

export default async function Page() {
  const page = await client.fetch<ContactQuery>(ContactQuery);

  return (
    <>
      <h1 hidden>{`${page.title} | Oxmose`}</h1>

      <section className="flex min-h-96 flex-col border-b border-black p-9 lg:min-h-[30rem] lg:p-10">
        <h2 className="mb-4 text-oxe-md lg:mb-10 lg:text-oxe-xxl">
          {page.generalSection.title}
        </h2>

        <div className="text-oxe-sm lg:text-oxe-lg">
          <PortableText value={page.generalSection.content} />
        </div>

        <p className="mt-auto text-right text-oxe-md lg:text-oxe-xxl">
          <a href={page.generalSection.link.href}>
            {page.generalSection.link.name}
          </a>
        </p>
      </section>

      <section className="flex min-h-96 flex-col gap-12 divide-black border-b border-black p-9 lg:grid lg:min-h-[32rem] lg:grid-cols-2 lg:gap-0 lg:divide-x lg:p-0">
        <div className="grid grid-cols-2 lg:p-10">
          <h3 className="text-oxe-md lg:text-oxe-xxl">Listen</h3>

          <ul className="lg:list-inside lg:list-disc lg:self-end">
            {page.listenLinks.map((link) => (
              <li
                key={link._id}
                className="whitespace-nowrap text-oxe-sm lg:text-oxe-lg"
              >
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 lg:p-10">
          <h3 className="text-oxe-md lg:text-oxe-xxl">Follow</h3>

          <ul className="lg:list-inside lg:list-disc lg:self-end">
            {page.followLinks.map((link) => (
              <li
                key={link._id}
                className="whitespace-nowrap text-oxe-sm lg:text-oxe-lg"
              >
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex min-h-96 flex-col border-b border-black p-9 lg:min-h-[30rem] lg:p-10">
        <h2 className="mb-4 text-oxe-md lg:mb-10 lg:text-oxe-xxl">
          {page.demoSection.title}
        </h2>

        <div className="text-oxe-sm lg:text-oxe-lg">
          <PortableText value={page.demoSection.content} />
        </div>

        <p className="mt-auto text-right text-oxe-md lg:text-oxe-xxl">
          <a href={page.demoSection.link.href}>{page.demoSection.link.name}</a>
        </p>
      </section>

      <section className="divide-y divide-black border-b border-black lg:grid lg:grid-cols-2 lg:divide-x lg:divide-y-0">
        <div className="flex min-h-96 flex-row p-9 lg:min-h-[32rem] lg:flex-col lg:p-10">
          <h3 className="flex-1 text-oxe-md lg:flex-auto lg:text-oxe-xxl">
            Location
          </h3>

          <div className="flex flex-1 flex-col justify-between gap-10 lg:mt-auto lg:flex-initial lg:flex-row">
            <dl>
              <dt className="text-oxe-sm font-medium lg:text-oxe-lg">
                Headquarters
              </dt>
              <dd className="text-oxe-sm lg:text-oxe-lg">Paris</dd>
            </dl>

            <dl>
              <dt className="text-oxe-sm font-medium lg:text-oxe-lg">
                Office/Studio
              </dt>
              <dd className="text-oxe-sm lg:text-oxe-lg">Bucharest</dd>
            </dl>
          </div>
        </div>

        <div className="flex min-h-96 flex-col p-9 lg:min-h-[32rem] lg:p-10">
          <h3 className="text-oxe-md lg:text-oxe-xxl">{page.pressKit.name}</h3>

          <p className="mt-auto text-right text-oxe-md lg:text-oxe-xxl">
            {/* <!-- @todo Convert to download link --> */}
            <a href={page.pressKit.href}>download</a>
          </p>
        </div>
      </section>

      <section className="flex min-h-96 flex-col p-9 lg:min-h-[30rem] lg:p-10">
        <h2 className="mb-4 text-oxe-md lg:mb-10 lg:text-oxe-xxl">
          {page.syncSection.title}
        </h2>

        <div className="text-oxe-sm lg:text-oxe-lg">
          <PortableText value={page.syncSection.content} />
        </div>

        <p className="mt-auto text-right text-oxe-md lg:text-oxe-xxl">
          <a href={page.syncSection.link.href}>{page.syncSection.link.name}</a>
        </p>
      </section>
    </>
  );
}
