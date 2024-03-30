import CategoryArticleComponent from "_old/components/shared/CategoryArticleComponent";
import { getFaqs } from "_old/lib/sanity.fetch";

export default async function Faq() {
  const faqs = await getFaqs();

  return <main>{faqs && <CategoryArticleComponent data={faqs} />}</main>;
}
