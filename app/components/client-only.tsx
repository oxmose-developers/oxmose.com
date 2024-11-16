import dynamic from "next/dynamic";
import type { FunctionComponent, PropsWithChildren } from "react";

const ClientOnly: FunctionComponent<PropsWithChildren> = ({ children }) =>
  children;

export default dynamic(() => Promise.resolve(ClientOnly), { ssr: false });
