import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { NEXT_TAGS } from "../../../constants/tags";
import { TAGS } from "../../../lib/constants";

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: string | undefined;
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      return new Response("Invalid Signature", { status: 401 });
    }

    console.log(body);

    if (!body?._type) {
      return new Response("Bad Request", { status: 400 });
    }

    switch (body._type) {
      case "artist": {
        revalidateTag(NEXT_TAGS.ARTISTS);
        revalidateTag(NEXT_TAGS.ARTISTS_STATIC_PARAMS);

        if (body.slug) {
          revalidateTag(body.slug);
        }
      }
      case "faqs": {
        revalidateTag(NEXT_TAGS.FAQ);

        if (body.slug) {
          revalidateTag(body.slug);
        }
      }
      case "publishingArtist":
      case "publishing": {
        revalidateTag(NEXT_TAGS.PUBLISHING);
        revalidateTag(NEXT_TAGS.PUBLISHING_ARTISTS);
        revalidateTag(NEXT_TAGS.PUBLISHING_ARTISTS_STATIC_PARAMS);

        if (body.slug) {
          revalidateTag(body.slug);
        }
      }
      case "seo": {
        revalidateTag(NEXT_TAGS.SEO);
      }
      case "about": {
        revalidateTag(NEXT_TAGS.ABOUT);
      }
      case "contact": {
        revalidateTag(NEXT_TAGS.CONTACT);
      }
      case "legal": {
        revalidateTag(NEXT_TAGS.LEGAL_STATIC_PARAMS);

        if (body.slug) {
          revalidateTag(body.slug);
        }
      }
      case "release": {
        revalidateTag(NEXT_TAGS.RELEASES);
        revalidateTag(NEXT_TAGS.RELEASES_STATIC_PARAMS);

        if (body.slug) {
          /**
           * Make sure to revalidate products as well when a release is updated
           */
          revalidateTag(TAGS.collections);
          revalidateTag(TAGS.products);
          revalidateTag(body.slug);
        }
      }
      default: {
        revalidateTag(body._type);

        if (body.slug) {
          revalidateTag(body.slug);
        }
      }
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (error: any) {
    console.error(error);

    return new Response(error.message, { status: 500 });
  }
}
