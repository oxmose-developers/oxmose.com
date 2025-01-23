import { hasAtLeast } from "remeda";

import type { Credits } from "../../lib/sanity";

function CreditArticleItem({
  item,
  isNotLastIndex,
}: {
  item: Credits["items"][0];
  isNotLastIndex: boolean;
}) {
  return (
    <>
      {item?.link ? (
        <a href={item.link} target="_blank">
          {item.name}
        </a>
      ) : (
        <span>{item.name}</span>
      )}

      {isNotLastIndex && (
        <>
          <span className="hidden md:inline">, </span>
          <br className="md:hidden" />
        </>
      )}
    </>
  );
}

export default function CreditArticle({ credit }: { credit: Credits }) {
  return (
    <article>
      <h3 className="text-oxe-xxs font-medium uppercase md:text-oxe-md">
        {credit.title}
      </h3>

      {!!credit?.namedItems && hasAtLeast(credit.namedItems, 1) ? (
        <>
          {credit.namedItems.map((namedItem) => (
            <p className="text-oxe-xxs md:text-oxe-md" key={namedItem._key}>
              <span className="uppercase">{namedItem.name}</span>{" "}
              {namedItem.items.map((item, idx) => (
                <CreditArticleItem
                  key={`${idx}-${item.name}`}
                  item={item}
                  isNotLastIndex={idx !== namedItem.items.length - 1}
                />
              ))}
            </p>
          ))}
        </>
      ) : (
        <p className="text-oxe-xxs md:text-oxe-md">
          {credit.items.map((item, idx) => (
            <CreditArticleItem
              key={`${idx}-${item.name}`}
              item={item}
              isNotLastIndex={idx !== credit.items.length - 1}
            />
          ))}
        </p>
      )}
    </article>
  );
}
