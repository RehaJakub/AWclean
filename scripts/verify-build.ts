import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
const escapeText = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const sitemap = readFileSync("dist/sitemap.xml", "utf8");
const htaccess = readFileSync("dist/.htaccess", "utf8");
assert.match(htaccess, /Content-Security-Policy/, "Chybí CSP v .htaccess");
assert.match(htaccess, /RewriteRule \^ochrana-osobnich-udaju/, "Chybí aliasy v .htaccess");
// CSP style-src 'self' zahodí každý předvykreslený atribut style="".
for (const file of readdirSync("dist", { recursive: true, encoding: "utf8" }).filter((name) => name.endsWith(".html")))
  assert.doesNotMatch(readFileSync(resolve("dist", file), "utf8"), /\sstyle="/, `Inline style v ${file} poruší CSP`);
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
  const ofType = (type: string) =>
    structuredData.filter((entry): entry is Record<string, unknown> => !!entry && typeof entry === "object" && "@type" in entry && entry["@type"] === type);
  // FAQPage jen tam, kde je FAQ vidět, a jen s viditelnými otázkami.
  const visibleQuestions = [...html.matchAll(/<summary><span>([^<]+)<\/span>/g)].map((match) => match[1]);
  const faq = ofType("FAQPage");
  assert.equal(faq.length, visibleQuestions.length ? 1 : 0, `FAQPage neodpovídá viditelnému FAQ: ${url.pathname}`);
  if (faq.length)
    assert.deepEqual(
      (faq[0].mainEntity as { name: string }[]).map((question) => escapeText(question.name)),
      visibleQuestions,
      `FAQPage obsahuje jiné otázky, než stránka zobrazuje: ${url.pathname}`,
    );
  const crumbs = html.match(/aria-label="Drobečková navigace"><ol>([\s\S]*?)<\/ol>/)?.[1];
  const breadcrumbList = ofType("BreadcrumbList");
  assert.equal(breadcrumbList.length, crumbs ? 1 : 0, `BreadcrumbList neodpovídá drobečkům: ${url.pathname}`);
  if (crumbs)
    assert.equal((breadcrumbList[0].itemListElement as unknown[]).length, crumbs.match(/<li>/g)?.length);
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
    assert.ok(html.includes('id="sluzby"'));
  }

  if (!html.includes(`href="${url.href}"`))
    throw new Error(`Nesprávný canonical: ${url.pathname}`);
  if (!/<title>[^<]+ \| AWCLEAN<\/title>/.test(html))
    throw new Error(`Chybí title: ${url.pathname}`);
  const metadata = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  )?.[1];
  assert.ok(metadata, `Chybí JSON-LD: ${url.pathname}`);
  const graph: unknown = JSON.parse(metadata);
  assert.ok(typeof graph === "object" && graph !== null && "@graph" in graph && Array.isArray(graph["@graph"]));
  const business = (graph["@graph"] as Record<string, unknown>[]).find((node) => node["@type"] === "HomeAndConstructionBusiness");
  assert.ok(business, `Chybí HomeAndConstructionBusiness: ${url.pathname}`);
  assert.ok(JSON.stringify(business.address).includes("Na Výsluní 298"));
  assert.equal(business.telephone, "+420 773 196 097");
  assert.equal((business.contactPoint as unknown[]).length, 3);
  assert.equal((business.areaServed as unknown[]).length, 2);
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
const notFound = readFileSync("dist/404.html", "utf8");
assert.ok(!notFound.includes('"FAQPage"'), "404 nesmí mít FAQPage.");
if (!notFound.includes('content="noindex"'))
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
