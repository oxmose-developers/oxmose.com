"use client"

import { CustomPortableText } from "components/shared/CustomPortableText";
import { useState } from "react"
import { typeOf } from "react-is";
import type { PortableTextBlock } from "sanity";

interface ExpandableTextProps {
  value?: PortableTextBlock[] | string;
  maxLength?: number
  classesWrapper: string;
}

export default function ExpandableText({value="", maxLength=100, classesWrapper}: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState("h-[100px]");

  function toggleExpand() {
    setExpanded(!expanded);
    setHeight(expanded ? "h-[100px]" : "fit-content");
  }

  return (
    <>
      <div className={`overflow-hidden ellipsis ${height}`}>
        {
        typeof value === 'string' 
        ?
          <p>{value}</p> 
        :
          <CustomPortableText value={value} paragraphClasses={classesWrapper}/>
        }
      </div>

      <button onClick={toggleExpand} className="text-lg">{expanded ? '-' : '+'}</button>
    </>
  )
}