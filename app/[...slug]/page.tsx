import { getPostBySlug, getSlugs } from '@/lib/md';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getSlugs().map(s => ({ slug: s.split('/') }));
}

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  try {
    const p = getPostBySlug(params.slug.join('/'));
    return { title: p.title, description: p.description };
  } catch { return {}; }
}

export default function Page({ params }: { params: { slug: string[] } }) {
  try {
    const p = getPostBySlug(params.slug.join('/'));
    const html = p.body
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')
      .replace(/\*(.*?)\*/gim, '<i>$1</i>')
      .replace(/\n$/gim, '<br />');

    return (
      <article className="prose max-w-none">
        <section dangerouslySetInnerHTML={{ __html: html }} />
        {p.affiliate?.length ? (
          <aside className="mt-8 border rounded-lg p-4">
            <h3>Rekommenderade alternativ</h3>
            <ul className="grid sm:grid-cols-2 gap-3 mt-2">
              {p.affiliate.map(a => (
                <li key={a.id}>
                  <Link className="underline" href={`/r/${a.id}`}>{a.label}</Link>
                </li>
              ))}
            </ul>
            <p className="text-xs text-zinc-500 mt-3">Annonslänkar. Vi kan få ersättning.</p>
          </aside>
        ) : null}
      </article>
    );
  } catch {
    notFound();
  }
}
