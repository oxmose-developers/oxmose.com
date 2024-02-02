
import CategoryArticleComponent from "components/shared/CategoryArticleComponent";
import { getTerms } from "lib/sanity.fetch";

export default async function Faq() {
  const termsArticles = await getTerms();

  return (
    <main>
      {termsArticles && <CategoryArticleComponent data={termsArticles} />}
    </main>
  )
}
