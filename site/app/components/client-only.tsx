"use client";

import dynamic from "next/dynamic";
import type { FunctionComponent, PropsWithChildren } from "react";

const ClientOnly: FunctionComponent<PropsWithChildren> = ({ children }) =>
  children;

// @ts-expect-error Ignore this, non-issue
export default dynamic(() => Promise.resolve(ClientOnly), { ssr: false });
