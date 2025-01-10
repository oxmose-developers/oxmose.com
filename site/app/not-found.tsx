import Link from "next/link";

export default function NotFound() {
  return (
    <section className="fixed inset-0 z-10 grid place-items-center bg-white">
      <div>
        <h2 className="mb-1.5 text-center text-oxe-md md:mb-10 md:text-oxe-xxxxl">
          Not found 404 broken record
          <br />
          <br />
          <Link
            className="mt-auto text-center text-oxe-md font-semibold uppercase md:text-oxe-xxxxl"
            href="/"
          >
            Back home
          </Link>
        </h2>
      </div>
    </section>
  );
}
