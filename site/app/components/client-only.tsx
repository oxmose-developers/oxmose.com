"use client";

import dynamic from "next/dynamic";
import type { FunctionComponent, PropsWithChildren } from "react";

const ClientOnly: FunctionComponent<PropsWithChildren> = ({ children }) =>
  children;

// @ts-expect-error - This is a valid JSX element
export default dynamic(() => Promise.resolve(ClientOnly), { ssr: false });
