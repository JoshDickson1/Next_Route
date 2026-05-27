import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const SITE_URL = 'https://nextroutetravels.com';
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const PAGE_SEO = {
  '/': {
    title: 'Next Route Travels — We Plan the Route. You Enjoy the Journey.',
    description: 'From Lagos to London, Serengeti to New York — seamless air travel, West African road trips, and curated international expeditions.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      name: 'Next Route Travels',
      url: SITE_URL,
      logo: `${SITE_URL}/fav.png`,
      address: { '@type': 'PostalAddress', addressLocality: 'Lagos', addressCountry: 'NG' },
      areaServed: ['Nigeria', 'Ghana', 'West Africa', 'Europe', 'Americas', 'Middle East'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Travel Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'International Flights' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'West African Road Travel' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Latin America Expeditions' } },
        ],
      },
    },
  },
  '/services': {
    title: 'Travel Services — Next Route Travels',
    description: 'From international flights to cross-continent road expeditions — we cover every route, every mode, every adventure.',
  },
  '/destinations': {
    title: 'Destinations — Next Route Travels',
    description: 'Every destination we feature is one we know intimately — Rome, Serengeti, Dubai, London and more, with curated guides to help you travel smarter.',
  },
  '/our-story': {
    title: 'Our Story — Next Route Travels',
    description: 'Learn about the people and purpose behind Next Route Travels — a Lagos-based agency built to make world-class travel accessible across Africa and beyond.',
  },
  '/enquiries': {
    title: 'Contact Us — Next Route Travels',
    description: 'Get in touch with Next Route Travels to start planning your journey. Flights, road trips, and expeditions — we handle every route.',
  },
};

function buildHeadBlock(url, seo) {
  const canonical = `${SITE_URL}${url === '/' ? '' : url}/`;
  const lines = [
    `<title>${seo.title}</title>`,
    `<meta name="description" content="${seo.description}"/>`,
    `<link rel="canonical" href="${canonical}"/>`,
    `<meta property="og:type" content="website"/>`,
    `<meta property="og:site_name" content="Next Route Travels"/>`,
    `<meta property="og:title" content="${seo.title}"/>`,
    `<meta property="og:description" content="${seo.description}"/>`,
    `<meta property="og:url" content="${canonical}"/>`,
    `<meta property="og:image" content="${OG_IMAGE}"/>`,
    `<meta name="twitter:card" content="summary_large_image"/>`,
    `<meta name="twitter:title" content="${seo.title}"/>`,
    `<meta name="twitter:description" content="${seo.description}"/>`,
    `<meta name="twitter:image" content="${OG_IMAGE}"/>`,
  ];
  if (seo.jsonLd) {
    lines.push(`<script type="application/ld+json">${JSON.stringify(seo.jsonLd)}</script>`);
  }
  return lines.join('\n    ');
}

// React 19 renders <title>/<meta>/<link> inline during renderToString.
// Remove them from the body — they'll be in <head> and React re-hoists on hydration.
function cleanBodyHtml(html) {
  return html
    .replace(/<title>[^<]*<\/title>/g, '')
    .replace(/<meta\s(?!charset|viewport)[^>]*>/g, '')
    .replace(/<link\s+rel="(?:canonical|preload|stylesheet)[^"]*"[^>]*>/g, '')
    .replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
}

async function main() {
  const builtTemplate = readFileSync(resolve(root, 'dist/index.html'), 'utf-8');
  const { render } = await import(resolve(root, 'dist-server/entry-server.js'));

  for (const [url, seo] of Object.entries(PAGE_SEO)) {
    try {
      const { html } = await render(url);
      const headBlock = buildHeadBlock(url, seo);
      const cleanedBody = cleanBodyHtml(html);

      // Inject SEO tags after the viewport meta (Vite never strips <meta> tags)
      const page = builtTemplate
        .replace(/(<meta name="viewport"[^>]*>)/, `$1\n    ${headBlock}`)
        .replace(/(<div id="root">)[^<]*(<\/div>)/, `$1${cleanedBody}$2`)
        .replace(/<div id="root">(<\/div>)?/, `<div id="root">${cleanedBody}</div>`);

      // For the replacement above to work cleanly, do it in two steps:
      const withHead = builtTemplate.replace(
        /(<meta name="viewport"[^>]*>)/,
        `$1\n    ${headBlock}`
      );
      const withBody = withHead.replace(
        /<div id="root">[\s\S]*?<\/div>/,
        `<div id="root">${cleanedBody}</div>`
      );

      const filePath =
        url === '/'
          ? resolve(root, 'dist/index.html')
          : resolve(root, `dist${url}/index.html`);

      mkdirSync(dirname(filePath), { recursive: true });
      writeFileSync(filePath, withBody);
      console.log(`✓ prerendered ${url}`);
    } catch (err) {
      console.error(`✗ failed ${url}:`, err.message);
    }
  }
}

main().catch(console.error);
