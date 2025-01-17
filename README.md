# Oxmose Records

Site is built with Next.js and Sanity, with e-commerce from Shopify.

Next + Sanity logic is ripped from https://github.com/sanity-io/sanity-template-nextjs-clean, and the e-commerce logic is ripped from https://github.com/vercel/commerce.

### FAQ Redirect

The `/faq` route is setup as a redirect to `/faq/orders` as the FAQ pages are unique per category.

To change the default FAQ page, update the `destination` in the `redirects` array in `next.config.ts`.
