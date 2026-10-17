import { build, createServer, loadEnv } from 'vite';
import fs from 'node:fs/promises';
const env = { ...loadEnv('production', process.cwd(), ''), ...process.env };
const preview = env.VERCEL_ENV === 'preview';
let siteUrl = env.SITE_URL || (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : '');
if (siteUrl) {
  const parsed = new URL(siteUrl);
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.search || parsed.hash || parsed.pathname !== '/') throw Error('SITE_URL must be an HTTPS origin, such as https://your-domain.com');
  siteUrl = parsed.origin;
}
await build({ configLoader: 'runner', define: { 'import.meta.env.VITE_PREVIEW': JSON.stringify(String(preview)) } });
const server = await createServer({ configLoader: 'runner', optimizeDeps: { noDiscovery: true, include: [] }, server: { middlewareMode: true }, appType: 'custom' });
try {
  const { render } = await server.ssrLoadModule('/src/entry-server.jsx');
  for (const [file, route] of [['index.html', '/'], ['services.html', '/services.html']]) {
    let html = await fs.readFile(`dist/${file}`, 'utf8');
    html = html.replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`);
    const schema = {
      '@context': 'https://schema.org', '@graph': [
        { '@type': 'Person', name: 'Yeabsira Alemayehu', alternateName: 'Yeab', jobTitle: 'Full-Stack Web Developer',
          ...(siteUrl ? { url: siteUrl } : {}),
          address: { '@type': 'PostalAddress', addressLocality: 'Addis Ababa', addressCountry: 'ET' },
          sameAs: ['https://github.com/Yeab0226', 'https://www.linkedin.com/in/yeab-a-340884309'] },
        { '@type': 'WebSite', name: 'BuiltByYeab', ...(siteUrl ? { url: siteUrl } : {}), inLanguage: 'en' }
      ]
    };
    let head = `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`;
    if (siteUrl) {
      const canonical = siteUrl + route;
      head += `<link rel="canonical" href="${canonical}" /><meta property="og:url" content="${canonical}" />`;
      head += `<meta property="og:image" content="${siteUrl}/images/footer-background.jpg" /><meta property="og:image:alt" content="BuiltByYeab developer workspace" /><meta name="twitter:image" content="${siteUrl}/images/footer-background.jpg" />`;
    }
    if (preview) html = html.replace(/<meta name="robots" content="[^"]*"\s*\/>/, '<meta name="robots" content="noindex, follow" />');
    html = html.replace('</head>', head + '\n</head>');
    await fs.writeFile(`dist/${file}`, html);
  }
  await fs.writeFile('dist/robots.txt', `User-agent: *\n${preview ? 'Disallow: /' : 'Allow: /'}\n${siteUrl && !preview ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ''}`);
  if (siteUrl && !preview) await fs.writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteUrl}/</loc></url></urlset>\n`);
  else console.log('Sitemap and canonical URLs require SITE_URL or VERCEL_PROJECT_PRODUCTION_URL; no domain has been invented.');
  console.log('Pre-rendered portfolio and services pages.');
} finally { await server.close(); }


