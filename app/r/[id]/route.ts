import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';
import yaml from 'js-yaml';
import fs from 'node:fs';

type Provider = { id: string; url: string; };

function providers(): Provider[] {
  const obj = yaml.load(fs.readFileSync('data/providers/list.yml','utf8')) as any;
  return obj.providers || [];
}

export async function GET(req: NextRequest, { params }: { params: { id: string }}) {
  const prov = providers().find(p => p.id === params.id);
  const dest = prov?.url || '/';
  const sig = crypto.createHmac('sha256', process.env.AFFILIATE_SECRET || 'x').update(params.id).digest('hex').slice(0,8);

  if (process.env.PLAUSIBLE_DOMAIN && process.env.PLAUSIBLE_API) {
    try {
      await fetch(process.env.PLAUSIBLE_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'AffiliateClick',
          url: req.nextUrl.toString(),
          domain: process.env.PLAUSIBLE_DOMAIN
        })
      });
    } catch {}
  }

  return NextResponse.redirect(dest + (dest.includes('?') ? '&' : '?') + 'ref_sig=' + sig, 302);
}
