/**
 * Find out why the tailwind classes aren't applied when interpolated
 */


"use client"

import { useState } from "react"

interface ExpandableTextProps {
  initialHeight?: string;
  children?: React.ReactNode;
  classesWrapper: string;
}

export default function Expandable({initialHeight="100px", classesWrapper, children}: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  // const customHeight = `h-[${initialHeight}]`;
  const [height, setHeight] = useState(initialHeight);

  function toggleExpand() {
    setExpanded(!expanded);
    setHeight(expanded ? initialHeight : "fit-content");
  }

  return (
    <div className={classesWrapper}>
      <div className="overflow-hidden ellipsis" style={{height: height}}>
        {children}
      </div>

      <button onClick={toggleExpand} className="text-lg py-2 pr-3 lg:text-3xl lg:font-bold">{expanded ? '-' : '+'}</button>
    </div>
  )
}