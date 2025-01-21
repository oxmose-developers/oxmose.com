import { Fragment } from "react";
import { hasAtLeast } from "remeda";

import type { Credits } from "../../lib/sanity";

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
                <Fragment key={`${idx}-${item.name}`}>
                  {!!item?.link ? (
                    <a href={item.link} target="_blank">
                      {item.name}
                    </a>
                  ) : (
                    <span>{item.name}</span>
                  )}
                  {idx !== namedItem.items.length - 1 && (
                    <>
                      <span className="hidden md:inline">, </span>
                      <br className="md:hidden" />
                    </>
                  )}
                </Fragment>
              ))}
            </p>
          ))}
        </>
      ) : (
        <p className="text-oxe-xxs md:text-oxe-md">
          {credit.items.map((item, idx) => (
            <Fragment key={`${idx}-${item.name}`}>
              {!!item?.link ? (
                <a href={item.link} target="_blank">
                  {item.name}
                </a>
              ) : (
                <span>{item.name}</span>
              )}
              {idx !== credit.items.length - 1 && (
                <>
                  <span className="hidden md:inline">, </span>
                  <br className="md:hidden" />
                </>
              )}
            </Fragment>
          ))}
        </p>
      )}
    </article>
  );
}
