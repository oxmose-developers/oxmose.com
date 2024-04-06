import { PortableText } from "@portabletext/react";

import { AboutQuery } from "../../../groq";
import { client } from "../../../lib/sanity";
import CreditArticle from "./components/CreditArticle";

export default async function Page() {
  const page = await client.fetch<AboutQuery>(AboutQuery);

  return (
    <>
      <h1 hidden>{`${page.title} | Oxmose`}</h1>

      <section className="flex min-h-[56rem] items-center border-b border-black p-9 lg:p-10">
        <div className="text-oxe-md lg:text-oxe-xxl/[85px]">
          <PortableText value={page.part1} />
        </div>
      </section>

      <section className="min-h-[56rem] divide-black border-b border-black p-9 lg:grid lg:grid-cols-2 lg:divide-x lg:p-0">
        <div className="mb-5 space-y-5 lg:mb-0 lg:space-y-10 lg:p-10">
          {page.part2.left.map((credit) => (
            <CreditArticle key={credit._id} credit={credit} />
          ))}
        </div>

        <div className="space-y-5 lg:space-y-10 lg:p-10">
          {page.part2.right.map((credit) => (
            <CreditArticle key={credit._id} credit={credit} />
          ))}
        </div>
      </section>

      <section className="flex min-h-[56rem] items-center border-b border-black p-9 lg:p-10">
        <div className="text-oxe-md lg:text-oxe-xxl/[85px]">
          <PortableText value={page.part3} />
        </div>
      </section>

      <section className="min-h-[56rem] divide-black border-b border-black p-9 lg:grid lg:grid-cols-2 lg:divide-x lg:p-0">
        <div className="mb-5 space-y-5 lg:mb-0 lg:space-y-10 lg:p-10">
          {page.part4.left.map((credit) => (
            <CreditArticle key={credit._id} credit={credit} />
          ))}
        </div>

        <div className="space-y-5 lg:space-y-10 lg:p-10">
          {page.part4.right.map((credit) => (
            <CreditArticle key={credit._id} credit={credit} />
          ))}
        </div>
      </section>

      <section className="flex min-h-[56rem] items-center border-b border-black p-9 lg:p-10">
        <div className="text-oxe-md lg:text-oxe-xxl/[85px]">
          <PortableText value={page.part5} />
        </div>
      </section>

      <section className="min-h-[56rem] p-9 lg:p-10"></section>
    </>
  );
}
