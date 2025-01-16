import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid flex-1 place-items-center">
      <div>
        <h2 className="mb-1.5 text-center text-oxe-md md:mb-10 md:text-oxe-xxxxl">
          Not found 404 broken record
          <br />
          <br />
          <Link
            className="mt-auto text-center font-semibold uppercase"
            href="/"
          >
            Back home
          </Link>
        </h2>
      </div>
    </section>
  );
}
