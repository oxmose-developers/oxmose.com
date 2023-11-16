import "server-only";

import type { QueryParams } from "@sanity/client";
import { closestIndexTo } from "date-fns";
import { env } from "env.mjs";
import { client } from "lib/sanity.client";
import {
  artistBySlugQuery,
  artistListQuery,
  artistPaths,
  homePageQuery,
  homePageTitleQuery,
  pagePaths,
  pagesBySlugQuery,
  realeaseBySlugQuery2,
  releaseListQuery,
  settingsQuery,
} from "lib/sanity.queries";
import { draftMode } from "next/headers";
import type {
  ArtistListPayload,
  ArtistPayload,
  HomePagePayload,
  PagePayload,
  ReleaseListPayload,
  ReleasePayload,
  SettingsPayload,
} from "types";

// import { revalidateSecret } from "./sanity.api";

export const token = env.SANITY_API_READ_TOKEN;

const DEFAULT_PARAMS = {} as QueryParams;
const DEFAULT_TAGS = [] as string[];

export async function sanityFetch<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
}: {
  query: string;
  params?: QueryParams;
  tags: string[];
}): Promise<QueryResponse> {
  const isDraftMode = draftMode().isEnabled;

  // @TODO this won't be necessary after https://github.com/sanity-io/client/pull/299 lands
  const sanityClient =
    client.config().useCdn && isDraftMode
      ? client.withConfig({ useCdn: false })
      : client;
  return sanityClient.fetch<QueryResponse>(query, params, {
    // We only cache if there's a revalidation webhook setup
    cache: "no-store",//revalidateSecret ? "force-cache" : "no-store",
    ...(isDraftMode && {
      cache: undefined,
      token: token,
      perspective: "previewDrafts",
    }),
    next: {
      ...(isDraftMode && { revalidate: 30 }),
      tags,
    },
  });
}

export function getSettings() {
  return sanityFetch<SettingsPayload>({
    query: settingsQuery,
    tags: ["settings", "home", "page"],
  });
}

export function getPageBySlug(slug: string) {
  return sanityFetch<PagePayload | null>({
    query: pagesBySlugQuery,
    params: { slug },
    tags: [`page:${slug}`],
  });
}

export function getArtistBySlug(slug: string) {
  return sanityFetch<ArtistPayload | null>({
    query: artistBySlugQuery,
    params: { slug },
    tags: [`artist:${slug}`],
  });
}

export function getHomePage() {
  return sanityFetch<HomePagePayload | null>({
    query: homePageQuery,
    tags: ["home"],
  });
}

export function getHomePageTitle() {
  return sanityFetch<string | null>({
    query: homePageTitleQuery,
    tags: ["home"],
  });
}

export function getPagesPaths() {
  return client.fetch<string[]>(
    pagePaths,
    {},
    { token, perspective: "published" },
  );
}

export function getArtistPaths() {
  return client.fetch<string[]>(
    artistPaths,
    {},
    { token, perspective: "published" },
  );
}

export function getArtistList() {
  return client.fetch<ArtistListPayload[] | null>(
    artistListQuery,
    { token, perspective: "published"}
  )
}

export function getReleaseList() {
  return client.fetch<ReleaseListPayload[] | null>(
    releaseListQuery,
    { token, perspective: "published"}
  )
}
export function getReleaseBySlug(slug: string) {
  return sanityFetch<ReleasePayload | null>({
    query: realeaseBySlugQuery2,
    params: { slug },
    tags: [`realease:${slug}`],
  });
}