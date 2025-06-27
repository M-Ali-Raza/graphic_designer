import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export function getContent() {
  const filePath = path.join(process.cwd(), 'content/text.md');
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // Parse frontmatter and content
  const { data, content } = matter(fileContent);

  // Convert markdown to HTML
  const htmlContent = marked(content);

  return {
    intro: data.intro,
    job: data.job,
    btn_name: data.about_button_name,
    logo: data.profile_logo,
    contact_line:data.contact_line,
    content: htmlContent,
  };
}
