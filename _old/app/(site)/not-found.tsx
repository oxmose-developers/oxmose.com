import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex justify-center">
      <div className="mt-12 md:mt-28 ">
        <h2 className="text-9xl">404</h2>
        <div className="mb-24 flex flex-col space-y-2">
          <h3 className="text-6xl md:text-8xl">Uh-oh!</h3>
          <p className="text-2xl">There is nothing here.</p>
        </div>
        <Link
          className="border bg-black px-3 py-2 text-xl text-white hover:bg-gray-800"
          href="/"
        >
          Return Home
        </Link>
      </div>
    </section>
  );
}
