import type { Credits } from "../../lib/sanity";

export default function CreditArticle({ credit }: { credit: Credits }) {
  const joinHtmlString = `<span class="hidden md:inline">, </span><br class="md:hidden" />`;

  return (
    <article>
      <h3 className="text-oxe-xxs font-medium uppercase md:text-oxe-md">
        {credit.title}
      </h3>

      <p
        className="text-oxe-xxs md:text-oxe-md"
        dangerouslySetInnerHTML={{
          __html: credit.items.map((item) => item.name).join(joinHtmlString),
        }}
      ></p>
    </article>
  );
}
