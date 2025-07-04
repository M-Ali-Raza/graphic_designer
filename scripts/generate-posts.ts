// scripts/generate-posts.ts
import * as fs from 'fs';
import * as path from 'path';

const projectsDir = path.join(process.cwd(), 'projects');
const outputFile = path.join(process.cwd(), 'lib', 'posts-data.ts');

function generatePostsData(): void {
  try {
    console.log('Projects directory:', projectsDir);
    console.log('Output file:', outputFile);
    
    // Check if projects directory exists
    if (!fs.existsSync(projectsDir)) {
      console.log('Projects directory not found, creating empty posts data');
      writeEmptyPostsData();
      return;
    }

    const allFiles = fs.readdirSync(projectsDir);
    console.log('All files in projects directory:', allFiles);
    
    const files = allFiles.filter(file => file.endsWith('.md'));
    console.log('Markdown files:', files);
    
    if (files.length === 0) {
      console.log('No markdown files found, creating empty posts data');
      writeEmptyPostsData();
      return;
    }

    const postsData: Record<string, string> = {};
    
    files.forEach(file => {
      const slug = file.replace('.md', '').toLowerCase(); // Convert to lowercase
      const filePath = path.join(projectsDir, file);
      
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        console.log(`Read file ${file}, content length: ${content.length}`);
        
        // Escape template literals and quotes in content
        const escapedContent = content
          .replace(/\\/g, '\\\\')
          .replace(/`/g, '\\`')
          .replace(/\${/g, '\\${');
        
        postsData[slug] = escapedContent;
      } catch (error) {
        console.error(`Error reading file ${file}:`, error);
      }
    });

    console.log('Generated slugs:', Object.keys(postsData));

    const output = `// This file is auto-generated by scripts/generate-posts.ts
// Do not edit manually

export const postsData: Record<string, string> = {
${Object.entries(postsData)
  .map(([slug, content]) => `  '${slug}': \`${content}\`,`)
  .join('\n')}
};
`;

    // Ensure lib directory exists
    const libDir = path.dirname(outputFile);
    if (!fs.existsSync(libDir)) {
      fs.mkdirSync(libDir, { recursive: true });
    }

    fs.writeFileSync(outputFile, output);
    console.log(`Generated posts data for ${files.length} posts`);
    console.log('Output written to:', outputFile);
    
  } catch (error) {
    console.error('Error generating posts data:', error);
    writeEmptyPostsData();
  }
}

function writeEmptyPostsData(): void {
  const output = `// This file is auto-generated by scripts/generate-posts.ts
// Do not edit manually

export const postsData: Record<string, string> = {};
`;
  
  // Ensure lib directory exists
  const libDir = path.dirname(outputFile);
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }
  
  fs.writeFileSync(outputFile, output);
  console.log('Created empty posts data file');
}

generatePostsData();