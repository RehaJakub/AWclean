import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
const sitemap = readFileSync("dist/sitemap.xml", "utf8");
const titles = new Set<string>();
const descriptions = new Set<string>();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => new URL(match[1]),
);
for (const url of urls) {
  const file = resolve("dist", `.${url.pathname}`, "index.html");
  if (!existsSync(file)) throw new Error(`Chybí stránka: ${file}`);
  const html = readFileSync(file, "utf8");
  assert.equal(
    html.match(/<h1(?:\s|>)/g)?.length,
    1,
    `Chybí předvykreslený H1: ${url.pathname}`,
  );
  const structuredData: unknown[] = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]) as unknown);
  const faq = structuredData.find((entry) => entry && typeof entry === "object" && "@type" in entry && entry["@type"] === "FAQPage");
  assert.ok(faq && typeof faq === "object" && "mainEntity" in faq && Array.isArray(faq.mainEntity) && faq.mainEntity.length === 9, `Chybí FAQPage: ${url.pathname}`);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/name="description"\s+content="([^"]+)"/)?.[1];
  assert.ok(title && description);
  assert.ok(!titles.has(title), `Duplicitní titulek: ${title}`);
  assert.ok(
    !descriptions.has(description),
    `Duplicitní popis: ${url.pathname}`,
  );
  titles.add(title);
  descriptions.add(description);
  for (const image of html.matchAll(/<img\b[^>]*src="([^"]+)"[^>]*>/g)) {
    assert.ok(
      existsSync(resolve("public", `.${image[1]}`)),
      `Chybí fotka v HTML: ${image[1]}`,
    );
    assert.match(image[0], /alt="[^"]*"/);
    assert.match(image[0], /width="\d+"/);
    assert.match(image[0], /height="\d+"/);
  }
  if (url.pathname === "/") {
    assert.match(
      html,
      /<img[^>]*loading="eager"[^>]*fetchPriority="high"|<img[^>]*fetchPriority="high"[^>]*loading="eager"/,
    );
    assert.ok(html.includes('id="pred-a-po"'));
    assert.ok(html.indexOf('id="pred-a-po"') < html.indexOf('id="sluzby"'));
  }

  if (!html.includes(`href="${url.href}"`))
    throw new Error(`Nesprávný canonical: ${url.pathname}`);
  if (!/<title>[^<]+ \| AWCLEAN<\/title>/.test(html))
    throw new Error(`Chybí title: ${url.pathname}`);
  const metadata = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  )?.[1];
  assert.ok(metadata, `Chybí JSON-LD: ${url.pathname}`);
  const business: unknown = JSON.parse(metadata);
  assert.ok(
    typeof business === "object" &&
      business !== null &&
      "@type" in business &&
      business["@type"] === "LocalBusiness",
  );
  assert.ok(
    "address" in business &&
      JSON.stringify(business.address).includes("Na Výsluní 298"),
  );
  assert.ok(
    "telephone" in business &&
      Array.isArray(business.telephone) &&
      business.telephone.length === 3,
  );
  assert.ok(
    "email" in business &&
      Array.isArray(business.email) &&
      business.email.length === 2,
  );
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  for (const field of ["title", "description", "image"]) {
    const og = html.match(
      new RegExp(`property="og:${field}"\\s+content="([^"]+)"`),
    )?.[1];
    const twitter = html.match(
      new RegExp(`name="twitter:${field}"\\s+content="([^"]+)"`),
    )?.[1];
    assert.ok(og && twitter, `Chybí metadata ${field}: ${url.pathname}`);
    assert.equal(twitter, og, `Nesouhlasí OG/Twitter: ${url.pathname}`);
  }
  for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)) {
    if (!existsSync(resolve("dist", `.${match[1]}`)))
      throw new Error(`Chybí asset: ${match[1]}`);
  }
}
if (!readFileSync("dist/404.html", "utf8").includes('content="noindex"'))
  throw new Error("404 musí obsahovat noindex.");
if (
  !readFileSync("public/documents/osvedceni-awclean.pdf")
    .subarray(0, 4)
    .equals(Buffer.from("%PDF"))
)
  throw new Error("Osvědčení není platný PDF soubor.");
console.log(
  `Ověřeno ${urls.length} předvykreslených adres, fotografie, unikátní metadata, Open Graph, Twitter, JSON-LD, build assety, 404 a lokální PDF.`,
);
