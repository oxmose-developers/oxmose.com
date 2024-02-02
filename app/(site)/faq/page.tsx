
import CategoryArticleComponent from "components/shared/CategoryArticleComponent";
import { getFaqs } from "lib/sanity.fetch";

export default async function Faq() {
  const faqs = await getFaqs();

  return (
    <main>
      {faqs && <CategoryArticleComponent data={faqs} />}
    </main>
  )
}
