import Link from 'next/link'
 
export default function NotFound() {
  return (
    <section className="flex justify-center">

      <div className="mt-12 md:mt-28 ">
        <h2 className="text-9xl">404</h2>
        <div className="flex flex-col space-y-2 mb-24">
          <h3 className="text-6xl md:text-8xl">Uh-oh!</h3>
          <p className="text-2xl">There is nothing here.</p>
        </div>
        <Link className="text-xl border py-2 px-3 bg-black text-white hover:bg-gray-800" href="/">Return Home</Link>
      </div>
    </section>
  )
}