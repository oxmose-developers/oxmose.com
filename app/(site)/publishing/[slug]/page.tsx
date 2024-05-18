export async function generateStaticParams() {
  return [];
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
}
