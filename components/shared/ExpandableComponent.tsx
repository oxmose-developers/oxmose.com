/**
 * Find out why the tailwind classes aren't applied when interpolated
 */


"use client"

import { useState } from "react"

interface ExpandableTextProps {
  initialHeight?: string
  children?: React.ReactNode
}

export default function Expandable({initialHeight="100px", children}: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  // const [height, setHeight] = useState(`h-[${initialHeight}]`);

  function toggleExpand() {
    setExpanded(!expanded);
    // setHeight(expanded ? "h-[100px]" : "fit-content");
  }

  return (
    <>
      <div className={`overflow-hidden ellipsis ${expanded ? "fit-content" : "h-[100px]"}`}>
        {children}
      </div>

      <button onClick={toggleExpand} className="text-lg py-2 pr-3">{expanded ? '-' : '+'}</button>
    </>
  )
}