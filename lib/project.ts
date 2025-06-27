// lib/markdown.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import { PostMetadata,PostFrontMatter,PostContent } from '@/types/types';

const contentDirectory = path.join(process.cwd(), 'projects');

// Define interfaces for your frontmatter


export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(contentDirectory);
  
  return fileNames.map(fileName => {
    return fileName.replace(/\.md$/, '');
  });
}

export function getPostMetadata(slug: string): PostMetadata {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  const matterResult = matter(fileContents);
  
  return {
    slug,
    ...matterResult.data as PostFrontMatter
  };
}

export function getAllPostMetadata(): PostMetadata[] {
  const slugs = getAllPostSlugs();
  const posts = slugs.map(slug => getPostMetadata(slug));
  return posts;
//   // Sort posts by date (newest first)
//   return posts.sort((a, b) => {
//     if (a.date < b.date) {
//       return 1;
//     } else {
//       return -1;
//     }
//   });
}

export async function getPostContent(slug: string): Promise<PostContent> {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  const matterResult = matter(fileContents);
  
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(matterResult.content);
    
  const contentHtml = processedContent.toString();
  
  return {
    slug,
    contentHtml,
    ...matterResult.data as PostFrontMatter
  };
}