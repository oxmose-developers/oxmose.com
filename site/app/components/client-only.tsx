"use client";

import dynamic from "next/dynamic";
import type { FunctionComponent, PropsWithChildren } from "react";

const ClientOnly: FunctionComponent<PropsWithChildren> = ({ children }) =>
  children;

// @ts-expect-error - Ignore Error, occurs in Vercel only it seems
export default dynamic(() => Promise.resolve(ClientOnly), { ssr: false });
