"use client"

import { useMediaQuery } from "@uidotdev/usehooks";
import ReleasePageDesktop from "components/pages/release/ReleasePageDesktop";
import ReleasePageMobile from "components/pages/release/ReleasePageMobile";

export default function WindowSizeLayout ({ data }) {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  return (
    <>
      {isSmallDevice ? (
        <ReleasePageMobile data={data} />
      ) : (
        <ReleasePageDesktop data={data} />
      )}
    </>
  );
};

