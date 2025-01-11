import { create } from "zustand";

export const OpenPopover = {
  FOLLOW: "FOLLOW",
  NEWSLETTER: "NEWSLETTER",
} as const;

export type OpenPopover = (typeof OpenPopover)[keyof typeof OpenPopover];

interface GlobalState {
  openPopover: OpenPopover | undefined;
}

export const useGlobalStore = create<GlobalState>()((set) => ({
  openPopover: undefined,
}));

export const setOpenPopover = (value: OpenPopover | undefined) =>
  useGlobalStore.setState({ openPopover: value });
