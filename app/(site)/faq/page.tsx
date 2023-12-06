
import FaqPage from "components/pages/faq/FaqPage";
import { getFaqs } from "lib/sanity.fetch";

export default async function Faq() {
  const faqs = await getFaqs();

  return (
    <main>
      {faqs && <FaqPage data={faqs} />}
    </main>
  )
}
