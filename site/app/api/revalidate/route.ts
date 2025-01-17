import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { NEXT_TAGS } from "../../../constants/tags";
import { TAGS } from "../../../lib/constants";

type WebhookPayload = {
  _type: string;
  slug?: string | undefined;
};

export async function POST(req: NextRequest) {
  try {
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return new Response(
        "Missing environment variable SANITY_REVALIDATE_SECRET",
        { status: 500 },
      );
    }

    const { body, isValidSignature } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      const message = "Invalid signature";
      return new Response(
        JSON.stringify({
          message,
          isValidSignature,
          body,
        }),
        { status: 401 },
      );
    } else if (!body?._type) {
      const message = "Bad Request";
      return new Response(
        JSON.stringify({
          message,
          body,
        }),
        { status: 400 },
      );
    }

    console.log(body);

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
