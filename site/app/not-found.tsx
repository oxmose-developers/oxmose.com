import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-96 flex-col border-b border-black p-9 md:min-h-128 md:p-10">
      <h2 className="md:text-oxe-xxxxl mb-1.5 text-oxe-md md:mb-10">
        Not found
      </h2>

      <p className="md:text-oxe-xl text-oxe-sm">
        Could not find requested resource
      </p>

      <p className="md:text-oxe-xxxxl mt-auto text-right text-oxe-md uppercase">
        <Link href="/">home</Link>
      </p>
    </section>
  );
}
