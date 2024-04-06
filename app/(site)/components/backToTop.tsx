"use client"

export default function BackToTop() {
  return <button onClick={() => {window.scrollTo({ top: 0, behavior: "smooth" });}} type="button" id="back-to-top" className="block text-oxe-xs lg:hidden">
  <span role="img" aria-hidden="true">↑</span>
  <span className="sr-only">Back to top</span>
</button>
}