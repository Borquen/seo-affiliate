import './globals.css';
export const metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://example.com'),
  title: { default: 'Jämför & välj – ' + (process.env.BRAND || 'Sajten'), template: '%s – ' + (process.env.BRAND || 'Sajten') },
  description: 'Neutrala jämförelser. Cookie-fri mätning. '
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const plausible = process.env.PLAUSIBLE_DOMAIN
    ? <script defer data-domain={process.env.PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js"></script>
    : null;
  return (
    <html lang="sv">
      <body className="min-h-screen bg-white text-zinc-900">
        {plausible}
        <header className="max-w-5xl mx-auto p-4"><a href="/" className="font-semibold">{process.env.BRAND || 'Sajten'}</a></header>
        <main className="max-w-5xl mx-auto p-4">{children}</main>
        <footer className="max-w-5xl mx-auto p-4 text-sm text-zinc-500">© {(new Date()).getFullYear()} · {process.env.BRAND || 'Sajten'}</footer>
      </body>
    </html>
  );
}
