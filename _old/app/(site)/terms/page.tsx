import CategoryArticleComponent from "_old/components/shared/CategoryArticleComponent";
import { getTerms } from "_old/lib/sanity.fetch";

export default async function Faq() {
  const termsArticles = await getTerms();

  return (
    <main>
      {termsArticles && <CategoryArticleComponent data={termsArticles} />}
    </main>
  );
}
