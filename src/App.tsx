import { lazy, Suspense, useEffect, useState } from "react";
import { faqSchema } from "./data/faq";
const MascotWidget = lazy(() => import("./components/MascotWidget"));
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { ServicePage } from "./pages/ServicePage";
import { ServicesPage } from "./pages/ServicesPage";
import { ReferencesPage } from "./pages/ReferencesPage";
import { ProjectPage } from "./pages/ProjectPage";
import { ContactPage } from "./pages/ContactPage";
import { PressPage } from "./pages/PressPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { CleanFacadesPage } from "./pages/CleanFacadesPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { servicePages } from "./data/pages";
import { resolveRoute } from "./lib/routes";
interface AppProps {
  pathname?: string;
}
export default function App({
  pathname = typeof window === "undefined" ? "/" : window.location.pathname,
}: AppProps) {
  const route = resolveRoute(pathname);
  const [clientReady, setClientReady] = useState(false);
  useEffect(() => setClientReady(true), []);
  useEffect(() => {
    // The target does not exist until React has mounted on a direct page visit.
    if (!window.location.hash) return;
    const frame = window.requestAnimationFrame(() => {
      try {
        document
          .getElementById(decodeURIComponent(window.location.hash.slice(1)))
          ?.scrollIntoView({ behavior: "instant" });
      } catch {
        // A malformed URL fragment should not prevent the page from loading.
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    document.title = `${route.title} | AWCLEAN`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", route.description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", `${route.title} | AWCLEAN`);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", route.description);
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute("content", `https://www.awclean.cz${route.path}`);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", `https://www.awclean.cz${route.path}`);
    document
      .querySelector('meta[property="og:image"]')
      ?.setAttribute(
        "content",
        `https://www.awclean.cz${route.image ?? "/images/realizace/bytovy-dum-cisteni-z-plosiny-pred-a-po.webp"}`,
      );
    for (const [name, content] of Object.entries({
      "twitter:title": `${route.title} | AWCLEAN`,
      "twitter:description": route.description,
      "twitter:image": `https://www.awclean.cz${route.image ?? "/images/realizace/bytovy-dum-cisteni-z-plosiny-pred-a-po.webp"}`,
    }))
      document
        .querySelector(`meta[name="${name}"]`)
        ?.setAttribute("content", content);
    if (route.kind === "notFound") {
      const robots = document.createElement("meta");
      robots.name = "robots";
      robots.content = "noindex";
      document.head.append(robots);
      return () => robots.remove();
    }
  }, [route.path, route.title, route.description, route.image, route.kind]);
  const content = (() => {
    switch (route.kind) {
      case "home":
        return <HomePage />;
      case "service":
        return (
          <ServicePage
            page={route.page}
            related={servicePages.filter((page) =>
              route.page.related.includes(page.path),
            )}
          />
        );
      case "services":
        return <ServicesPage />;
      case "other":
        return <ServicesPage otherOnly />;
      case "references":
        return <ReferencesPage />;
      case "project":
        return <ProjectPage project={route.project} />;
      case "contact":
        return <ContactPage />;
      case "press":
        return <PressPage />;
      case "privacy":
        return <PrivacyPage />;
      case "advice":
        return <CleanFacadesPage />;
      case "notFound":
        return <NotFoundPage />;
    }
  })();
  return (
    <>
      <a className="skip-link" href="#main">
        Přeskočit na obsah
      </a>
      <Navbar
        currentPath={route.path}
        phone="+420 773 196 097"
        phoneHref="tel:+420773196097"
      />
      <main id="main">{content}</main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
      <Suspense fallback={null}>{clientReady && route.kind !== "advice" && <MascotWidget />}</Suspense>
    </>
  );
}
