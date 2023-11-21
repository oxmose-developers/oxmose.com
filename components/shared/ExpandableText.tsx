"use client"

import { useState } from "react"
import type { PortableTextBlock } from "sanity";

interface ExpandableTextProps {
  text: string;
  maxLength?: number
  classesWrapper: string;
}

export default function ExpandableText({text="", maxLength=100, classesWrapper}: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const shouldTruncate = text.length > maxLength;

  function toggleExpand() {
    setExpanded(!expanded);
  };

  return (
    <>
      <p className={classesWrapper}>
        {expanded || !shouldTruncate ? text : text.slice(0, maxLength) + '...'}
      </p>

      {shouldTruncate && (
        <button onClick={toggleExpand}>{expanded ? '-' : '+'}</button>
      )}
    </>
  )
}