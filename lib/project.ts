// lib/markdown.ts
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import { PostMetadata, PostFrontMatter, PostContent } from '@/types/types';

// Import the generated posts data
import { postsData } from './posts-data';

export function getAllPostSlugs(): string[] {
  const slugs = Object.keys(postsData);
  console.log('Available slugs:', slugs); // Debug log
  return slugs;
}

export function getPostMetadata(slug: string): PostMetadata {
  const fileContents = postsData[slug];
  
  if (!fileContents) {
    const availableSlugs = Object.keys(postsData);
    console.error(`Post not found: ${slug}`);
    console.error('Available slugs:', availableSlugs);
    throw new Error(`Post not found: ${slug}. Available posts: ${availableSlugs.join(', ')}`);
  }
  
  try {
    const matterResult = matter(fileContents);
    
    return {
      slug,
      ...matterResult.data as PostFrontMatter
    };
  } catch (error) {
    console.error(`Error parsing metadata for ${slug}:`, error);
    throw new Error(`Could not parse post metadata: ${slug}`);
  }
}

export function getAllPostMetadata(): PostMetadata[] {
  const slugs = getAllPostSlugs();
  return slugs.map(slug => {
    try {
      return getPostMetadata(slug);
    } catch (error) {
      console.error(`Error getting metadata for ${slug}:`, error);
      return null;
    }
  }).filter(Boolean) as PostMetadata[];
}

export async function getPostContent(slug: string): Promise<PostContent> {
  const fileContents = postsData[slug];
  
  if (!fileContents) {
    const availableSlugs = Object.keys(postsData);
    console.error(`Post not found: ${slug}`);
    console.error('Available slugs:', availableSlugs);
    throw new Error(`Post not found: ${slug}. Available posts: ${availableSlugs.join(', ')}`);
  }
  
  try {
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
    console.error(`Error processing content for ${slug}:`, error);
    throw new Error(`Could not process post content: ${slug}`);
  }
}