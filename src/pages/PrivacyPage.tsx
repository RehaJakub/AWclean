import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { privacySections } from "../data/privacy";
export function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Ochrana osobních údajů a cookies" }]} />
      <div className="rd-wrap privacy-layout">
      <nav className="privacy-toc" aria-label="Obsah stránky">
        {privacySections.map((section, index) => (
          <a key={section.title} href={`#oddil-${index + 1}`}>
            {index + 1}. {section.title}
          </a>
        ))}
      </nav>
      <article className="privacy-page">
        <header>
          <h1>Ochrana osobních údajů a cookies</h1>
          <p className="svc-lead">
            Přehled informací o zpracování kontaktních údajů, vašich právech a
            používání cookies na tomto webu.
          </p>
        </header>
        {privacySections.map((section, index) => (
          <section key={section.title} id={`oddil-${index + 1}`}>
            <h2>
              {index + 1}. {section.title}
            </h2>
            {section.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
            {section.bullets && (
              <ul>
                {section.bullets.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        <a className="rd-link" href="mailto:info@awclean.cz">
          Kontaktovat správce: info@awclean.cz
        </a>
      </article>
      </div>
    </>
  );
}
