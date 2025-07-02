// app/portfolio/[slug]/page.tsx
import Heading from "@/components/Heading";
import { getPostContent, getAllPostSlugs } from "@/lib/project";
import Image from "next/image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const post = await getPostContent(slug);

  return (
    <div>
      <Heading name={post.name.replace(/-/g, " ")} />
      <Image src={post.image} alt={post.name} width={500} height={500} />
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </div>
  );
};

export default Page;