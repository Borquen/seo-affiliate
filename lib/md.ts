import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT = path.join(process.cwd(), 'content');

export type Post = {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  affiliate?: { id: string; label: string }[];
  body: string;
}

export function getSlugs(): string[] {
  const walk = (dir: string): string[] => {
    return fs.readdirSync(dir).flatMap(file => {
      const full = path.join(dir, file);
      if (fs.statSync(full).isDirectory()) return walk(full);
      if (full.endsWith('.md') || full.endsWith('.mdx')) return [full.replace(CONTENT + '/', '').replace(/\.mdx?$/, '')];
      return [];
    });
  };
  return walk(CONTENT);
}

export function getPostBySlug(slug: string): Post {
  const file = path.join(CONTENT, slug + (fs.existsSync(path.join(CONTENT, slug + '.mdx')) ? '.mdx' : '.md'));
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    date: data.date || '',
    tags: data.tags || [],
    affiliate: data.affiliate || [],
    body: content
  };
}
