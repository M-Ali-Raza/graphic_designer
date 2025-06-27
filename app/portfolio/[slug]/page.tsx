// app/portfolio/[slug]/page.tsx
import Heading from "@/components/Heading";
import { getPostContent, getAllPostSlugs } from "@/lib/project";
import Image from "next/image";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// This generates all the static pages at build time
export async function generateStaticParams() {
  const posts = getAllPostSlugs();

  return posts.map((slug) => ({
    slug: slug,
  }));
}

const page = async (props: PageProps) => {
  const params = await props.params; // Await the params Promise
  const post = await getPostContent(params.slug);
  return (
    <div
      className="px-2 py-20 md:px-5 md:py-20 lg:px-20 lg:py-10 flex flex-col gap-2 md:gap-5 lg:gap-10 max-h-screen overflow-y-auto
    items-center md:items-start text-center md:text-left"
    >
      <Heading name={post.name.replace(/-/g," ")} />
      <div className="flex flex-col  lg:flex-row gap-2 md:gap-5 lg:gap-10">
        <Image
          src={post.image}
          alt={post.name}
          width={500}
          height={500}
          className="object-cover overflow-hidden rounded-xl"
        />
        <div className="flex flex-col gap-2 md:gap-5 lg:gap-10">
          <p>
            <span className="font-bold">Category:</span> {post.category}
          </p>
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
        </div>
      </div>
    </div>
  );
};

export default page;