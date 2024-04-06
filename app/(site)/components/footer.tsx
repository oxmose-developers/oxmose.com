import BackToTop from "./backToTop";

export default function Footer() {
  const fullYear = new Date().getFullYear();

  return <footer className="shrink-0 bg-black py-2 text-white lg:py-[13px]">
  <nav className="flex pl-9 pr-20 lg:pl-10">
    <BackToTop/>

    <div className="hidden gap-10 lg:flex">
      <a
        className="whitespace-nowrap text-oxe-xs uppercase lg:text-oxe-sm"
        href="/publishing"
      >
        Publishing
      </a>

      <a
        className="whitespace-nowrap text-oxe-xs uppercase lg:text-oxe-sm"
        href="/terms-and-conditions"
      >
        Terms
      </a>

      <a
        className="whitespace-nowrap text-oxe-xs uppercase lg:text-oxe-sm"
        href="/privacy-policy"
      >
        Privacy
      </a>

      <a
        className="whitespace-nowrap text-oxe-xs uppercase lg:text-oxe-sm"
        href="/faq">FAQ</a
      >
    </div>

    <span
      className="ml-auto whitespace-nowrap text-oxe-xs uppercase lg:text-oxe-sm"
    >
      {`© ${fullYear} Oxmose`}
    </span>
  </nav>
</footer>
}