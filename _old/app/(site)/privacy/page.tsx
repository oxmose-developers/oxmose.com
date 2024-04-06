import CategoryArticleComponent from "_old/components/shared/CategoryArticleComponent";
import { getPrivacyArticles } from "_old/lib/sanity.fetch";

export default async function Faq() {
  const privacyArticles = await getPrivacyArticles();

  return (
    <main>
      {privacyArticles && <CategoryArticleComponent data={privacyArticles} />}
    </main>
  );
}
