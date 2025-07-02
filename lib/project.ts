// lib/markdown.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import { PostMetadata, PostFrontMatter, PostContent } from '@/types/types';

// Change to public directory
const contentDirectory = path.join(process.cwd(), 'public', 'projects');

export function getAllPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(contentDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading directory:', error);
    return [];
  }
}

export function getPostMetadata(slug: string): PostMetadata {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    return {
      slug,
      ...matterResult.data as PostFrontMatter
    };
  } catch (error) {
    console.error(`Error reading file ${fullPath}:`, error);
    throw new Error(`Could not read post: ${slug}`);
  }
}

export function getAllPostMetadata(): PostMetadata[] {
  const slugs = getAllPostSlugs();
  const posts = slugs.map(slug => {
    try {
      return getPostMetadata(slug);
    } catch (error) {
      console.error(`Error getting metadata for ${slug}:`, error);
      return null;
    }
  }).filter(Boolean) as PostMetadata[];
  
  return posts;
}

export async function getPostContent(slug: string): Promise<PostContent> {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  
  try {
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
  } catch (error) {
    console.error(`Error reading post content for ${slug}:`, error);
    throw new Error(`Could not read post content: ${slug}`);
  }
}