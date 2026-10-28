/// <reference types="vitest/config" />
import { localBusiness } from "./src/data/seo";
import {
  defineConfig,
  createServer,
  type Plugin,
  type ViteDevServer,
  type PreviewServer,
} from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
  routes,
  routeAliases,
  resolveRoute,
  normalizePath,
  shareImage,
  type PageMeta,
} from "./src/lib/routes";
import sharp from "sharp";
import { referenceWorks } from "./src/data/referenceWorks";
const escapeRegex = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
function businessMetadata(): Plugin {
  return {
    name: "awclean-business-metadata",
    transformIndexHtml(html) {
      return html.replace(
        "</head>",
        `<script type="application/ld+json">${JSON.stringify(localBusiness).replace(/</g, "\\u003c")}</script></head>`,
      );
    },
  };
}
function legacyRedirects(): Plugin {
  const configure = (server: ViteDevServer | PreviewServer): void => {
    server.middlewares.use((request, response, next) => {
      const url = new URL(request.url ?? "/", "http://localhost");
      const target = routeAliases[normalizePath(url.pathname)];
      if (!target) {
        next();
        return;
      }
      response.statusCode = 301;
      response.setHeader("Location", `${target}${url.search}`);
      response.end();
    });
  };
  return {
    name: "awclean-legacy-redirects",
    configureServer: configure,
    configurePreviewServer: configure,
  };
}
function staticPages(): Plugin {
  let outputDirectory = "";
  let rootDirectory = "";
  return {
    name: "awclean-static-pages",
    apply: "build",
    configResolved(config) {
      rootDirectory = config.root;
      outputDirectory = resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      const renderer = await createServer({
        configFile: false,
        appType: "custom",
        plugins: [react()],
        server: { middlewareMode: true, hmr: false, ws: false, watch: null },
        optimizeDeps: { noDiscovery: true, include: [] },
      });
      try {
        const entry: unknown = await renderer.ssrLoadModule(
          "/src/entry-server.tsx",
        );
        if (
          !entry ||
          typeof entry !== "object" ||
          !("render" in entry) ||
          typeof entry.render !== "function"
        )
          throw new Error("Chybí renderer stránek.");
        const renderContent = entry.render as (pathname: string) => string;
        const template = await readFile(
          resolve(outputDirectory, "index.html"),
          "utf8",
        );
        const render = (page: PageMeta): string =>
          template
            .replace(
              '<div id="root"></div>',
              () => `<div id="root" data-render-year="${new Date().getFullYear()}">${renderContent(page.path)}</div>`,
            )
            .replace(
              /(<meta\s+name="twitter:title"\s+content=")[^"]*("\s*\/?>)/,
              `$1${escapeHtml(page.title)} | AWCLEAN$2`,
            )
            .replace(
              /(<meta\s+name="twitter:description"\s+content=")[^"]*("\s*\/?>)/,
              `$1${escapeHtml(page.description)}$2`,
            )
            .replace(
              /(<meta\s+name="twitter:image"\s+content=")[^"]*("\s*\/?>)/,
              `$1https://www.awclean.cz${shareImage(page.image).url}$2`,
            )
            .replace(
              /(<meta\s+name="twitter:image:alt"\s+content=")[^"]*("\s*\/?>)/,
              `$1${escapeHtml(page.title)}$2`,
            )
            .replace(
              /(<meta\s+property="og:image:alt"\s+content=")[^"]*("\s*\/?>)/,
              `$1${escapeHtml(page.title)}$2`,
            )
            .replace(
              /<title>[\s\S]*?<\/title>/,
              `<title>${escapeHtml(page.title)} | AWCLEAN</title>`,
            )
            .replace(
              /(<meta\s+name="description"\s+content=")[^"]*("\s*\/?>)/,
              `$1${escapeHtml(page.description)}$2`,
            )
            .replace(
              /(<meta\s+property="og:title"\s+content=")[^"]*("\s*\/?>)/,
              `$1${escapeHtml(page.title)} | AWCLEAN$2`,
            )
            .replace(
              /(<meta\s+property="og:description"\s+content=")[^"]*("\s*\/?>)/,
              `$1${escapeHtml(page.description)}$2`,
            )
            .replace(
              /(<meta\s+property="og:url"\s+content=")[^"]*("\s*\/?>)/,
              `$1https://www.awclean.cz${page.path}$2`,
            )
            .replace(
              /(<meta\s+property="og:image"\s+content=")[^"]*("\s*\/?>)/,
              `$1https://www.awclean.cz${shareImage(page.image).url}$2`,
            )
            .replace(
              /(<link\s+rel="canonical"\s+href=")[^"]*("\s*\/?>)/,
              `$1https://www.awclean.cz${page.path}$2`,
            );
        // Obrázky pro sdílení 1200×630 JPEG (Open Graph) z fotek stránek.
        await mkdir(resolve(outputDirectory, "images/og"), { recursive: true });
        const shareImages = new Map(routes.map((route) => [shareImage(route.image).url, shareImage(route.image).source]));
        for (const [url, source] of shareImages)
          await sharp(resolve(rootDirectory, `public${source}`))
            .resize(1200, 630, { fit: "cover", position: "attention" })
            .jpeg({ quality: 80, mozjpeg: true })
            .toFile(resolve(outputDirectory, `.${url}`));
        for (const route of routes) {
          const directory = resolve(outputDirectory, `.${route.path}`);
          await mkdir(directory, { recursive: true });
          await writeFile(resolve(directory, "index.html"), render(route));
        }
        for (const [alias, canonical] of Object.entries(routeAliases)) {
          const directory = resolve(outputDirectory, `.${alias}`);
          await mkdir(directory, { recursive: true });
          await writeFile(
            resolve(directory, "index.html"),
            render(resolveRoute(canonical)).replace(
              "</head>",
              `<meta http-equiv="refresh" content="0;url=${escapeHtml(canonical)}" /></head>`,
            ),
          );
        }
        // Hosting redirects are generated from the same aliases as the application.
        await writeFile(
          resolve(outputDirectory, "_redirects"),
          Object.entries(routeAliases)
            .map(
              ([alias, target]) =>
                `${alias} ${target} 301\n${alias.slice(0, -1)} ${target} 301`,
            )
            .join("\n") + "\n/* /404.html 404\n",
        );
        // Apache konfigurace: šablona v deploy/ + 301 aliasy ze stejných dat jako aplikace.
        const htaccessTemplate = await readFile(
          resolve(rootDirectory, "deploy/htaccess.template"),
          "utf8",
        );
        if (!htaccessTemplate.includes("# @ALIASES@"))
          throw new Error("Šablona .htaccess nemá značku # @ALIASES@.");
        // Cíl přesměrování: produkce, nebo náhledová doména při testu na novém hostingu (SITE_URL).
        const siteUrl = (process.env.SITE_URL ?? "https://www.awclean.cz").replace(/\/$/, "");
        const htaccess = htaccessTemplate.replaceAll("@SITE_URL@", siteUrl).replace(
          "# @ALIASES@",
          Object.entries(routeAliases)
            .map(
              ([alias, target]) =>
                `  RewriteRule ^${escapeRegex(alias.slice(1, -1))}/?(?:index\\.html)?$ ${siteUrl}${target} [R=301,L]`,
            )
            .join("\n"),
        );
        await writeFile(resolve(outputDirectory, ".htaccess"), htaccess);
        await writeFile(
          resolve(outputDirectory, "404.html"),
          render(resolveRoute("/404/"))
            .replace(/<link\s+rel="canonical"[^>]*>\s*/, "")
            .replace("</head>", '<meta name="robots" content="noindex" /></head>'),
        );
        await writeFile(
          resolve(outputDirectory, "sitemap.xml"),
          `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${routes
            .map(
              (route) =>
                // SEO-11: Reference načítají většinu fotek až na klientu, proto je vyjmenujeme v sitemapě.
                `<url><loc>https://www.awclean.cz${route.path}</loc>${
                  route.path === "/reference/"
                    ? [...new Set(referenceWorks.map((work) => work.src))]
                        .map((src) => `<image:image><image:loc>https://www.awclean.cz${escapeHtml(src)}</image:loc></image:image>`)
                        .join("")
                    : ""
                }</url>`,
            )
            .join("")}</urlset>`,
        );
      } finally {
        await renderer.close();
      }
    },
  };
}
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    businessMetadata(),
    legacyRedirects(),
    staticPages(),
  ],
  // Testy jen ze src: historické kopie v backups/ (ignorované Gitem) se nespouštějí.
  test: { include: ["src/**/*.test.{ts,tsx}"] },
});
