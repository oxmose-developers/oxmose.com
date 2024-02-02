import CategoryArticleComponent from "components/shared/CategoryArticleComponent";
import { getPrivacyArticles } from "lib/sanity.fetch";

export default async function Faq() {
  const privacyArticles = await getPrivacyArticles();

  return (
    <main>
      {privacyArticles && <CategoryArticleComponent data={privacyArticles} />}
    </main>
  )
}
