// functions/r/[id].ts — Cloudflare Pages Function
// Runtime: Pages Functions (supportas av Cloudflare Pages gratisnivå)

export const onRequestGet: PagesFunction = async (ctx) => {
  const id = ctx.params.id as string;

  // Läs YAML listan från repo (bundlas som statisk fil)
  const url = new URL(ctx.request.url);
  const base = url.origin;

  // Hämta providers-filen (byggs in i /data)
  const res = await fetch(base + '/data/providers/list.yml');
  if (!res.ok) return Response.redirect(base + '/', 302);
  const text = await res.text();

  // Minimal YAML-parse (utan lib): enkel radmatchning
  // För robust parse, byt till ett JSON-format i produktion.
  const match = text
    .split('\n')
    .map(l => l.trim())
    .join('\n')
    .match(new RegExp(`- id: "${id}"[\\s\\S]*?url:\\s+"([^"]+)"`));

  const dest = match?.[1] || base + '/';
  const secret = (ctx.env as any)?.AFFILIATE_SECRET || 'x';
  const sig = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(id + secret)
  );
  const hex = Array.from(new Uint8Array(sig)).slice(0,4).map(b => b.toString(16).padStart(2,'0')).join('');

  // Plausible event (valfritt – fungerar om du kör proxy/API)
  // Rek: aktivera "Outbound links" i Plausible istället för servercall.

  const redirectUrl = dest + (dest.includes('?') ? '&' : '?') + 'ref_sig=' + hex;
  return Response.redirect(redirectUrl, 302);
};
